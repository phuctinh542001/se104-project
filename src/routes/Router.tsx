import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home";
import About from "../pages/About/About";
import Team from "../pages/Team/Team";
import Reader from "../pages/Reader/Reader";
import Book from "../pages/Book/Book";
import BookLoan from "../pages/Ticket/BookLoan/BookLoan";
import BookReturn from "../pages/Ticket/BookReturn/BookReturn";
import CollectFines from "../pages/Ticket/CollectFines/CollectFines";
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
      <Route path="/ticket/book-loan" element={<BookLoan />} />
      <Route path="/ticket/book-return" element={<BookReturn />} />
      <Route path="/ticket/collect-fines" element={<CollectFines />} />
      <Route path="/statistic/book-loan-by-genre" element={<BookLoanByGenre />} />
      <Route path="/statistic/book-return-late" element={<BookReturnLate />} />
      <Route path="/regulation" element={<Regulation />} />
    </Routes>
  );
}
export default Router