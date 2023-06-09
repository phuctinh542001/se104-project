import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home";
import About from "../pages/About/About";
import Team from "../pages/Team/Team";
import Reader from "../pages/Reader/Reader";
import Book from "../pages/Book/Book";
import BookLoanTicket from "../pages/Ticket/BookLoanTicket/BookLoanTicket";
import BookReturnTicket from "../pages/Ticket/BookReturnTicket/BookReturnTicket";
import CollectFinesTicket from "../pages/Ticket/CollectFinesTicket/CollectFinesTicket";
import BookLoanByGenre from "../pages/Statistic/BookLoanByGenre/BookLoanByGenre";
import BookReturnLate from "../pages/Statistic/BookReturnLate/BookReturnLate";
import Regulation from "../pages/Regulation/Regulation";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/team" element={<Team />} />
      <Route path="/reader" element={<Reader />} />
      <Route path="/book" element={<Book />} />
      <Route path="/ticket/book-loan" element={<BookLoanTicket />} />
      <Route path="/ticket/book-return" element={<BookReturnTicket />} />
      <Route path="/ticket/collect-fines" element={<CollectFinesTicket />} />
      <Route path="/statistic/book-loan-by-genre" element={<BookLoanByGenre />} />
      <Route path="/statistic/book-return-late" element={<BookReturnLate />} />
      <Route path="/regulation" element={<Regulation />} />
    </Routes>
  );
}
export default Router