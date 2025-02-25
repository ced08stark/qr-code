"use client";
import { Html5QrcodeScanner } from "html5-qrcode";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const QRScanner = () => {
  const [scanResult, setScanResult] = useState("");
  const [pageContent, setPageContent] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const scanner = new Html5QrcodeScanner("reader", {
      fps: 10,
      qrbox: { width: 300, height: 300 },
    });

    scanner.render(
      async (decodedText) => {
        setScanResult(decodedText);
        setIsModalOpen(true);

        // Vérifier si l'URL est valide
        if (isValidUrl(decodedText)) {
          try {
            const response = await fetch(decodedText);
            const text = await response.text();
            setPageContent(text.substring(0, 500)); // Limite à 500 caractères
          } catch (error) {
            setPageContent("Impossible de récupérer le contenu de cette URL.");
          }
        } else {
          setPageContent("Ce n'est pas une URL valide.");
        }
      },
      (error) => {
        console.warn(error);
      }
    );

    return () => scanner.clear();
  }, []);

  // Vérifier si une URL est valide
  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div
        id="reader"
        className="w-[400px] h-[400px] lg:w-[500px] lg:h-[500px] border-2 border-gray-300"
      ></div>
      {/* MODAL */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="slide-in-right">
          <DialogHeader>
            <DialogTitle>QR Code Détecté</DialogTitle>
            <DialogDescription className="text-lg font-semibold">
              <a
                href={scanResult}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                {scanResult}
              </a>
            </DialogDescription>
          </DialogHeader>
          <div className="p-2 border-t">
            <h3 className="text-md font-semibold">Contenu récupéré :</h3>
            <p className="text-sm max-h-60 overflow-auto">{pageContent}</p>
          </div>
          <Button onClick={() => setIsModalOpen(false)}>Fermer</Button>
        </DialogContent>
      </Dialog>
      <div>
        <p className="text-sm max-h-60 overflow-auto">{pageContent}</p>
      </div>
    </div>
  );
};

export default QRScanner;
