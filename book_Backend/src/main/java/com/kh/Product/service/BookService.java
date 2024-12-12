package com.kh.Product.service;

import com.kh.Product.model.Book;
import com.kh.Product.repository.BookRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
public class BookService {
    @Autowired
    private BookRepo repo;

    // CRUD
    public List<Book> getAllBooks() {

        return repo.findAll();
    }

    public Book getBookById(int id) {
        return repo.findById(id).orElse(null);
    }

    public Book addBook(Book book, MultipartFile file) throws IOException {
        book.setImageName(file.getOriginalFilename());
        book.setImageType(file.getContentType());
        book.setImageData(file.getBytes());
        repo.save(book);
        return book;
    }

    public Book updateBook(int id, Book book, MultipartFile file) throws IOException {
        book.setImageName(file.getOriginalFilename());
        book.setImageType(file.getContentType());
        book.setImageData(file.getBytes());
        return repo.save(book);
    }
    public void deleteBook(int id){
        repo.deleteById(id);
    }
    public List<Book> searchBooks(String keyword){
        return repo.searchBooks(keyword);
    }
}
