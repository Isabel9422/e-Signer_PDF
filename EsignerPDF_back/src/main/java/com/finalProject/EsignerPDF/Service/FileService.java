package com.finalProject.EsignerPDF.Service;

import org.apache.pdfbox.multipdf.PDFMergerUtility;
import org.apache.pdfbox.multipdf.Splitter;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDPage;
import org.apache.pdfbox.pdmodel.PDPageContentStream;
import org.apache.pdfbox.pdmodel.common.PDRectangle;
import org.apache.pdfbox.pdmodel.interactive.annotation.PDAnnotationWidget;
import org.apache.pdfbox.pdmodel.interactive.form.PDAcroForm;
import org.apache.pdfbox.pdmodel.interactive.form.PDSignatureField;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.util.List;
import java.util.stream.IntStream;

@Service
public class FileService {

    public byte[] splitDocument(MultipartFile file, Integer startPage, Integer endPage) {

        byte[] bytesFile = null;

        try {
            PDDocument documentDivided = PDDocument.load(file.getBytes());
            Splitter splitter = new Splitter();
            splitter.setStartPage(startPage);
            splitter.setEndPage(endPage);
            List<PDDocument> pages = splitter.split(documentDivided);
            PDDocument finalDocument = new PDDocument();
            pages.forEach(p -> finalDocument.addPage(p.getPage(0)));

            ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
            finalDocument.save(byteArrayOutputStream);
            InputStream inputStream = new ByteArrayInputStream(byteArrayOutputStream.toByteArray());
            bytesFile = inputStream.readAllBytes();
            finalDocument.close();
            documentDivided.close();

        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        return bytesFile;
    }

    public byte[] mergeDocuments(List<MultipartFile> files) {
        byte[] bytesFile = null;

        try {
            PDFMergerUtility pdfMerger = new PDFMergerUtility();
            files.forEach(f -> {
                try {
                    pdfMerger.addSource(f.getInputStream());
                } catch (IOException e) {
                    throw new RuntimeException(e);
                }
            });
            ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
            pdfMerger.setDestinationStream(byteArrayOutputStream);
            pdfMerger.mergeDocuments(null);
            InputStream inputStream = new ByteArrayInputStream(byteArrayOutputStream.toByteArray());
            bytesFile = inputStream.readAllBytes();

        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        return bytesFile;
    }

    public byte[] signDocument(MultipartFile file, String position, String pageSelection, int pageNumber) {
        byte[] bytesFile = null;

        try {
            PDDocument document = PDDocument.load(file.getInputStream());
            PDAcroForm acroForm = document.getDocumentCatalog().getAcroForm();

            if (acroForm == null) {
                acroForm = new PDAcroForm(document);
                document.getDocumentCatalog().setAcroForm(acroForm);
            }

            List<Integer> pagesToSign = pageSelection.equals("all")
                    ? IntStream.range(0, document.getNumberOfPages()).boxed().toList()
                    : List.of(pageNumber - 1);

            for (int pageIndex : pagesToSign) {
                PDPage page = document.getPage(pageIndex);
                float x = position.equals("bottomLeft") ? 50 : page.getMediaBox().getWidth() - 200;
                float y = 50;

                PDRectangle rect = new PDRectangle(x, y,150, 50);

                // Create the signature field
                PDSignatureField signatureField = new PDSignatureField(acroForm);
                PDAnnotationWidget pdAnnotationWidget = new PDAnnotationWidget();
                pdAnnotationWidget.setRectangle(rect);
                signatureField.setWidgets(List.of(pdAnnotationWidget));
                signatureField.setPartialName("Signature" + pageIndex);
                acroForm.getFields().add(signatureField);

                // Create the rect to wrap the signature field
                PDPageContentStream contentStream = new PDPageContentStream(document, page, PDPageContentStream.AppendMode.APPEND, true);
                contentStream.addRect(x, y, rect.getWidth(), rect.getHeight());
                contentStream.stroke();
                contentStream.close();

                page.getAnnotations().add(pdAnnotationWidget);
            }

            ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
            document.save(byteArrayOutputStream);
            document.close();

            bytesFile = byteArrayOutputStream.toByteArray();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        return bytesFile;
    }
    public Integer getNumberPagesDocument(MultipartFile file){
        try {
            return PDDocument.load(file.getBytes()).getNumberOfPages();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}
