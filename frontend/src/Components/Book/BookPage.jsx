/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { Search, MapPin, IndianRupee, ArrowLeft } from "lucide-react";
import { useAuth } from "../context/AuthContext.jsx";
import { Input } from "../BookCompo/Input/Input";
import { Button } from "../BookCompo/Button/Button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../BookCompo/Select/Select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../BookCompo/Card/Card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../BookCompo/Tabs/Tabs";
import { toast } from "react-hot-toast";
import bookService from "../../services/bookService";

const BooksPage = () => {
  const { isAuthenticated } = useAuth();
  const [location, setLocation] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("browse");
  const [selectedBook, setSelectedBook] = useState(null);
  const [message, setMessage] = useState("");
  const [buyerPhone, setBuyerPhone] = useState("");
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [books, setBooks] = useState([]);

  // Fetch books via bookService using the backend URL from env
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const booksData = await bookService.getAllBooks();
        // Adjust if your backend returns an object like { count, books }
        setBooks(Array.isArray(booksData) ? booksData : booksData.books);
      } catch (error) {
        console.error("Error fetching books:", error);
        setBooks([]);
        toast.error("Failed to load books");
      }
    };

    fetchBooks();
  }, []);

  // Form state for selling a book
  const [sellFormData, setSellFormData] = useState({
    bookImage: null,
    title: "",
    author: "",
    category: "academic",
    condition: "Good",
    upiId: "",
    phone: "",
    price: "",
    location: "",
    description: "",
    status: "available",
  });

  // Handle input changes (except file)
  const handleSellFormChange = (e) => {
    const { name, value } = e.target;

    // Validation rules for specific fields
    switch (name) {
      case "author":
        if (!/^[A-Za-z\s]*$/.test(value)) {
          toast.error("Author name should contain only alphabets");
          return;
        }
        break;
      case "phone":
        if (value.length >= 13 && !/^\+91[0-9]{10}$/.test(value)) {
          toast.error("Please enter a valid Indian phone number (+91XXXXXXXXXX)");
          return;
        }
        break;
      case "price":
        if (value && !/^\d+$/.test(value)) {
          toast.error("Price must be a number");
          return;
        }
        break;
      default:
        break;
    }

    setSellFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle file input for book image
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && !file.type.startsWith("image/")) {
      toast.error("Please select an image file.");
      return;
    }
    setSellFormData((prevState) => ({
      ...prevState,
      bookImage: file,
    }));
    const [previewImage, setPreviewImage] = useState(null);
    setPreviewImage(URL.createObjectURL(file));
  };

  // Submit the sell book form
  const handleSellFormSubmit = async (e) => {
    e.preventDefault();

    if (!isAuthenticated) {
      toast.error("Please login to sell a book");
      return;
    }

    const requiredFields = [
      "bookImage",
      "title",
      "author",
      "category",
      "condition",
      "phone",
      "price",
      "location",
      "description",
    ];
    alert('Book listed successfully!');
    for (const field of requiredFields) {
      if (!sellFormData[field]) {
        toast.error(`Please fill in the ${field.replace(/([A-Z])/g, " $1").toLowerCase()}.`);
        return;
      }
    }

    try {
      // Call backend API via bookService
      const toastId = toast.loading("Uploading and saving your book...");
      const response = await bookService.createBook(sellFormData);
      setBooks([...books, response]);
      toast.success("Book listed for sale successfully!");
      // Reset the form
      setSellFormData({
        bookImage: null,
        title: "",
        author: "",
        category: "academic",
        condition: "Good",
        phone: "",
        price: "",
        location: "",
        description: "",
        status: "available",
      });
      setActiveTab("browse");
    } catch (error) {
      console.error("Error listing book:", error);
      toast.error(error.response?.data?.message || "Error listing book for sale");
    }
  };

  // Filtered books (using local search/filter; adjust as needed)
  const filteredBooks = Array.isArray(books)
    ? books.filter((book) => {
      if (!book) return false;
      const matchesLocation =
        !location || book.location?.toLowerCase().includes(location.toLowerCase());
      const matchesSearchQuery =
        !searchQuery || book.title?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesPriceRange =
        !priceRange ||
        (priceRange[0] <= book.price && book.price <= priceRange[1]);
      return matchesLocation && matchesSearchQuery && matchesPriceRange;
    })
    : [];

  const handleBookClick = (book) => {
    setSelectedBook(book);
  };

  const handleBackClick = () => {
    setSelectedBook(null);
  };

  const handleSendMessage = async () => {
    if (!isAuthenticated) {
      toast.error("Please login to send a message");
      return;
    }

    if (!message.trim() || !buyerPhone.trim()) {
      toast.error("Please enter both message and phone number");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `/api/books/${selectedBook.id}/messages`,
        { message, buyerPhone },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success("Message sent to the seller successfully!");
      setMessage("");
      setBuyerPhone("");
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Failed to send message. Please try again.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center mb-8 text-black">
        Books Marketplace
      </h1>
      {!selectedBook && (
        <>
          {activeTab === "browse" && (
            <div className="flex flex-col md:flex-row gap-4 mb-8 items-center justify-center">
              <div className="w-full md:w-1/3">
                <Input
                  type="text"
                  placeholder="Enter your location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full"
                />
              </div>
              <div className="w-full md:w-1/3">
                <Input
                  type="text"
                  placeholder="Search for books"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full"
                />
              </div>
              <div className="relative w-full md:w-1/3 bg-white rounded-lg shadow p-1">
                <h3 className="text-lg font-semibold mb-4">Price</h3>
                <div className="flex items-center mb-2">
                  <span className="text-lg font-medium">₹{priceRange[0]} - ₹{priceRange[1]}+</span>
                </div>
                <div className="relative mt-4">
                  <div className="absolute h-1 w-full bg-blue-200 rounded">
                    <div
                      className="absolute h-1 bg-blue-500"
                      style={{
                        left: `${(priceRange[0] / 2000) * 100}%`,
                        right: `${100 - (priceRange[1] / 2000) * 100}%`,
                      }}
                    ></div>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="2000"
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                    className="absolute w-full h-1 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-500 [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-blue-500 [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:shadow-md [&::-moz-range-thumb]:cursor-pointer"
                  />
                  <input
                    type="range"
                    min="0"
                    max="2000"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="absolute w-full h-1 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-500 [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-blue-500 [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:shadow-md [&::-moz-range-thumb]:cursor-pointer"
                  />
                </div>
              </div>
            </div>
          )}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="flex justify-center mb-6">
              <TabsTrigger
                value="browse"
                className={`px-4 py-2 rounded-md transition-all duration-300 ${activeTab === "browse"
                  ? "bg-gray-500 text-white shadow-lg"
                  : "bg-gray-200 text-gray-800"
                  } focus:outline-none hover:bg-gray-400`}
                onClick={() => setActiveTab("browse")}
              >
                Browse Books
              </TabsTrigger>
              <TabsTrigger
                value="sell"
                className={`px-4 py-2 rounded-md transition-all duration-300 ${activeTab === "sell"
                  ? "bg-gray-600 text-white shadow-lg"
                  : "bg-gray-200 text-gray-800"
                  } focus:outline-none hover:bg-gray-400`}
                onClick={() => setActiveTab("sell")}
              >
                Sell a Book
              </TabsTrigger>
            </TabsList>
            <TabsContent value="browse">
              {filteredBooks.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredBooks.map((book) => (
                    <div
                      key={book.id}
                      className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                      onClick={() => handleBookClick(book)}
                    >
                      <div className="relative">
                        <img
                          src={`http://localhost:5001${book.image}`}
                          alt={book.title}
                          className="w-full h-48 object-cover"
                        />

                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                          <h3 className="text-white font-semibold text-lg">
                            {book.title}
                          </h3>
                          <p className="text-white/90 text-sm">
                            {book.author}
                          </p>
                        </div>
                      </div>
                      <div className="p-4">
                        <div className="space-y-2">
                          <div className="flex items-center text-gray-600">
                            <MapPin className="w-4 h-4 mr-2" />
                            <span className="text-sm">{book.location}</span>
                          </div>
                          <div className="flex items-center text-gray-800 font-semibold">
                            <IndianRupee className="w-4 h-4 mr-2" />
                            <span>₹{book.price}</span>
                          </div>
                        </div>
                        <div className="mt-4">
                          <button className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-300">
                            View Details
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center text-red-600 text-lg mt-14 mb-64">
                  No books found matching your search.
                </div>
              )}
            </TabsContent>
            <TabsContent value="sell">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-blue-900">
                    Sell Your Book
                  </CardTitle>
                  <CardDescription>
                    Fill in the details of your book
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSellFormSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="col-span-2">
                        <label className="block text-sm font-medium mb-1">
                          Book Image*
                        </label>
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          required
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          Upload a clear image of your book's cover
                        </p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Book Title*
                        </label>
                        <Input
                          type="text"
                          name="title"
                          value={sellFormData.title}
                          onChange={handleSellFormChange}
                          placeholder="Enter book title"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Author*
                        </label>
                        <Input
                          type="text"
                          name="author"
                          value={sellFormData.author}
                          onChange={handleSellFormChange}
                          placeholder="Enter author name"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Category*
                        </label>
                        <Select
                          name="category"
                          value={sellFormData.category}
                          onValueChange={(value) =>
                            handleSellFormChange({
                              target: { name: "category", value },
                            })
                          }
                        >
                          <SelectTrigger className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent className="bg-white border border-gray-200 shadow-lg rounded-lg mt-1 z-50">
                            <SelectItem
                              value="academic"
                              className="py-2 px-4 hover:bg-blue-50 cursor-pointer"
                            >
                              Academic
                            </SelectItem>
                            <SelectItem
                              value="non-academic"
                              className="py-2 px-4 hover:bg-blue-50 cursor-pointer"
                            >
                              Non-Academic
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Book Condition*
                        </label>
                        <Select
                          name="condition"
                          value={sellFormData.condition}
                          onValueChange={(value) =>
                            handleSellFormChange({
                              target: { name: "condition", value },
                            })
                          }
                        >
                          <SelectTrigger className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <SelectValue placeholder="Select condition" />
                          </SelectTrigger>
                          <SelectContent className="bg-white border border-gray-200 shadow-lg rounded-lg mt-1 z-50">
                            <SelectItem
                              value="New"
                              className="py-2 px-4 hover:bg-blue-50 cursor-pointer"
                            >
                              New
                            </SelectItem>
                            <SelectItem
                              value="Like New"
                              className="py-2 px-4 hover:bg-blue-50 cursor-pointer"
                            >
                              Like New
                            </SelectItem>
                            <SelectItem
                              value="Good"
                              className="py-2 px-4 hover:bg-blue-50 cursor-pointer"
                            >
                              Good
                            </SelectItem>
                            <SelectItem
                              value="Fair"
                              className="py-2 px-4 hover:bg-blue-50 cursor-pointer"
                            >
                              Fair
                            </SelectItem>
                            <SelectItem
                              value="Poor"
                              className="py-2 px-4 hover:bg-blue-50 cursor-pointer"
                            >
                              Poor
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Price (₹)*
                        </label>
                        <Input
                          type="number"
                          name="price"
                          value={sellFormData.price}
                          onChange={handleSellFormChange}
                          placeholder="Enter price in rupees"
                          min="0"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Location*
                        </label>
                        <Input
                          type="text"
                          name="location"
                          value={sellFormData.location}
                          onChange={handleSellFormChange}
                          placeholder="Enter your location"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Phone Number*
                        </label>
                        <Input
                          type="tel"
                          name="phone"
                          value={sellFormData.phone}
                          onChange={handleSellFormChange}
                          placeholder="+91XXXXXXXXXX"
                          pattern="^(\+91[\s]?)?[0]?[6-9]\d{9}$"
                          required
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          Format: +91XXXXXXXXXX
                        </p>
                      </div>  
                      <div className="col-span-2">
                        <label className="block text-sm font-medium mb-1">
                          Description*
                        </label>
                        <textarea
                          name="description"
                          value={sellFormData.description}
                          onChange={handleSellFormChange}
                          placeholder="Describe your book's condition or any other relevant details"
                          className="w-full min-h-[100px] p-2 border rounded-md"
                          required
                        />
                      </div>
                    </div>


                    <Button
                      type="submit"
                      class="w-full h-10 px-4 py-3 rounded-lg text-sm font-medium text-white bg-[#4285f4] hover:bg-[#3367d6] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                    // type="submit"
                    // className="w-full bg-[#4285f4] hover:bg-[#3367d6] text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200"
                    >
                      List Book for Sale
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </>
      )}
      {selectedBook && (
        <div className="mt-8">
          <Button onClick={handleBackClick} className="mb-4 flex items-center">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Books
          </Button>
          <Card>
            <CardHeader>
              <CardTitle>{selectedBook.title}</CardTitle>
              <CardDescription>{selectedBook.author}</CardDescription>
            </CardHeader>
            <CardContent>
              <img
                src={`http://localhost:5001${selectedBook.image}`}
                alt={selectedBook.title}
                className="w-full h-64 object-cover mb-4"
              />

              <p className="flex items-center text-gray-700 mb-2">
                <MapPin className="w-4 h-4 mr-2" /> {selectedBook.location}
              </p>
              <p className="flex items-center text-gray-700 mb-2">
                <IndianRupee className="w-4 h-4 mr-2" /> ₹{selectedBook.price}
              </p>
              <p className="text-gray-700 mb-2">
                <strong>Category:</strong> {selectedBook.category}
              </p>
              <p className="text-gray-700 mb-4">
                <strong>Description:</strong> {selectedBook.description}
              </p>
              <div className="mt-6">
                <p className="text-gray-700 mb-4">
                  <strong>
                    <h3>Contact Seller</h3>
                  </strong>{" "}
                  {selectedBook.phone}
                </p>
                <input
                  type="tel"
                  className="w-full p-2 border border-gray-300 rounded mb-4"
                  placeholder="Enter your mobile number"
                  value={buyerPhone}
                  onChange={(e) => setBuyerPhone(e.target.value)}
                  pattern="[0-9]{10}"
                  maxLength="10"
                  required
                />
                <textarea
                  className="w-full p-2 border border-gray-300 rounded mb-4"
                  placeholder="Enter your message to the seller..."
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                ></textarea>
                <div className="space-y-2">
                  <a
                    href={`https://wa.me/${selectedBook?.phone
                      ? selectedBook.phone.replace(/[^0-9]/g, "")
                      : ""
                      }?text=${encodeURIComponent(
                        `Hi, I'm interested in buying your book "${selectedBook?.title ||
                        ""}" listed on EduTrade.\n\nMessage: ${message}\n\nPrice: ₹${selectedBook?.price || ""
                        }\n\nBuyer's Contact: ${buyerPhone}`
                      )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full"
                  >
                    <Button className="w-full bg-[#25D366] text-white hover:bg-[#128C7E] transition-colors flex items-center justify-center">
                      <svg
                        viewBox="0 0 24 24"
                        className="w-4 h-4 mr-2"
                        fill="currentColor"
                      >
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                      Chat on WhatsApp
                    </Button>
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default BooksPage;
