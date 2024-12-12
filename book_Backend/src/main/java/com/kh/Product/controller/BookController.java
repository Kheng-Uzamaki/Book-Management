package com.kh.Product.controller;

import com.kh.Product.model.Book;
import com.kh.Product.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api")
public class BookController {

    @Autowired
    private BookService bookService;

    @GetMapping("/books")
    public ResponseEntity<List<Book>> getAllBooks(){
        return new ResponseEntity<>(bookService.getAllBooks(), HttpStatus.OK);
    }


    @GetMapping("/book/{id}")
    public ResponseEntity<Book> getBookById(@PathVariable int id){
        Book book = bookService.getBookById(id);
        if(book != null){
            return new ResponseEntity<>(book, HttpStatus.OK);
        }else{
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/book")
    public ResponseEntity<?> addBook(@RequestPart Book book,
                                     @RequestPart MultipartFile imgFile){
        try{
            Book b = bookService.addBook(book,imgFile);
            return new ResponseEntity<>(b, HttpStatus.CREATED);
        } catch (IOException e) {
            return new ResponseEntity<>(e.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/book/{id}/image")
    public ResponseEntity<byte[]> getBookImage(@PathVariable int id){
        Book book = bookService.getBookById(id);
        byte[] imgFile = book.getImageData();

        return ResponseEntity.ok()
                .contentType(MediaType.valueOf(book.getImageType()))
               .body(imgFile);
    }

    @PutMapping("/book/{id}")
    public ResponseEntity<String> updateBook(
            @PathVariable int id,
            @RequestPart("book") Book book,  // Ensure 'book' matches the frontend form-data part
            @RequestPart("imgFile") MultipartFile imgFile  // Ensure 'imgFile' matches the frontend image part
    ) throws IOException {
        Book b = null;
        try {
            b = bookService.updateBook(id, book, imgFile);
        } catch (IOException e) {
            return new ResponseEntity<>("Failed to update", HttpStatus.BAD_REQUEST);
        }

        if (b != null) {
            return new ResponseEntity<>("Book updated successfully", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Failed to update", HttpStatus.BAD_REQUEST);
        }
    }


    @DeleteMapping("book/{id}")
    public ResponseEntity<String> deleteBook(@PathVariable int id){
        Book book = bookService.getBookById(id);

        if(book!= null){
            bookService.deleteBook(id);
            return new ResponseEntity<>("Book deleted successfully", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Book not found", HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("books/search")
    public ResponseEntity<List<Book>> searchBooks(@RequestParam String keyword){
        List<Book> books = bookService.searchBooks(keyword);
        return new ResponseEntity<>(books, HttpStatus.OK);
    }


}
