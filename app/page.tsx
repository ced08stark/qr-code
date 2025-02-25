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
  const scanner = new Html5QrcodeScanner(
    "reader",
    { fps: 10, qrbox: { width: 250, height: 250 } },
    false
  );

  const onScanSuccess = (decodedText: string) => {
    setScanResult(decodedText);
    setIsModalOpen(true);

    // Déplacer la vérification et l'appel de fetchContent à un autre useEffect
    if (isValidUrl(decodedText)) {
      setPageContent("Vérification de l'URL...");
    } else {
      setPageContent("Ce n'est pas une URL valide.");
    }
  };

  const onScanError = (error: any) => {
    console.warn(error);
  };

  scanner.render(onScanSuccess, onScanError);

  return () => {
    scanner.clear(); // Fonction de nettoyage synchrone
  };
}, []);

useEffect(() => {
  if (isValidUrl(scanResult)) {
    const fetchContent = async (url: string) => {
      try {
        const response = await fetch(url);
        const text = await response.text();
        setPageContent(text.substring(0, 500));
      } catch (error) {
        setPageContent("Impossible de récupérer le contenu de cette URL.");
      }
    };

    fetchContent(scanResult);
  }
}, [scanResult]);

// Fonction asynchrone séparée
const fetchContent = async (url: string) => {
  try {
    const response = await fetch(url);
    const text = await response.text();
    setPageContent(text.substring(0, 500));
  } catch (error) {
    setPageContent("Impossible de récupérer le contenu de cette URL.");
  }
};

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
        className="w-[500px] h-[500px] border-2 border-gray-300"
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
