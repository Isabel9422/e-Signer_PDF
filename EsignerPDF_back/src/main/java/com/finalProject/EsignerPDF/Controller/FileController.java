package com.finalProject.EsignerPDF.Controller;

import com.finalProject.EsignerPDF.Service.FileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/file")
public class FileController {

    @Autowired
    private FileService fileService;

    @PostMapping
    @RequestMapping("/splitDocument")
    private ResponseEntity<byte[]> splitDocuments(@RequestParam("file") MultipartFile file, @RequestParam("startPage") Integer startPage, @RequestParam("endPage") Integer endPage){
        byte[] fileSplited = fileService.splitDocument(file, startPage, endPage);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_PDF);

        return ResponseEntity.ok().headers(headers).body(fileSplited);
    }

    @PostMapping
    @RequestMapping("/mergeDocuments")
    private ResponseEntity<byte[]> mergeDocuments(@RequestParam("file") List<MultipartFile> files){
        byte[] filesMerged = fileService.mergeDocuments(files);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_PDF);

        return ResponseEntity.ok().headers(headers).body(filesMerged);
    }

    @PostMapping
    @RequestMapping("/signDocument")
    private ResponseEntity<byte[]> signDocument(@RequestParam("file") MultipartFile file, @RequestParam("pageSelection") String pageSelection,
                                                @RequestParam(value = "pageSelected", required = false) Integer pageSelected, @RequestParam("position") String position){

        if(pageSelected == null) pageSelected = 0;
        byte[] fileSigned = fileService.signDocument(file, position, pageSelection, pageSelected);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_PDF);

        return ResponseEntity.ok().headers(headers).body(fileSigned);
    }

    @PostMapping
    @RequestMapping("/getNumberPagesDocument")
    private ResponseEntity<Integer> getNumberPagesDocument(@RequestParam("file") MultipartFile file){
        Integer numberPages = fileService.getNumberPagesDocument(file);
        return ResponseEntity.ok().body(numberPages);
    }

}
