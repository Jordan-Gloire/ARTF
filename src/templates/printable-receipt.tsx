"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";
import Image from "next/image";
import logoArmoirieCongo from "@/public/images/logo/cropped-Armoirie-COngo.png";
import QRCode from "qrcode";
import { useParams } from "next/navigation";
import CaisseService from "../services/app/caisse.service";
import { Button } from "@/components/ui/button";
import { useAppStore } from "../stores/app_store";
import { useShallow } from "zustand/react/shallow";
import { AdministrationInterface } from "@/types/app_types";

interface CaisseInterface {
  id: string | number;
  intitule: string;
  date: string;
  cout_total: number | string;
  uuid: string;
  print: number;
  numero_recu_caisse: string;
  status: string;
  created_at: string;
  updated_at: string;
  id_payment?: string;
  id_user: { id: number | string; nom: string };
  id_prestation: { id: number | string; nom: string };
  id_site: { id: number | string; nom: string };
}

export default function PrintableReceipt({
  //   uuid,
  withLocalStorage = true,
}: {
  uuid?: string;
  withLocalStorage?: boolean;
}) {
  const caisseId = useParams<{ caisseId: string }>()?.caisseId;

  const [qrCode, setQrCode] = useState<string>("");
  const [dataRecu, setDataRecu] = useState<
    CaisseInterface | undefined | null
  >();

  const administration = useAppStore(
    useShallow((state) => state.currentAdministration)
  );

  useEffect(() => {
    if (typeof window !== "undefined" && !dataRecu) {
      const dataLocalStorage: CaisseInterface | undefined | null = JSON.parse(
        localStorage.getItem(`facture_${caisseId}`) ?? "facture__"
      );
      if (dataLocalStorage) {
        setDataRecu(dataLocalStorage);
        localStorage.removeItem(`facture_${caisseId}`);
        setTimeout(() => {
          document.getElementById(caisseId ?? "")?.click();
          if (!dataLocalStorage.print) {
            const service = new CaisseService();
            service.validatePrint(dataLocalStorage.id);
          }
        }, 200);
      }
    }
    const generateQRCode = async () => {
      if (dataRecu && !qrCode) {
        const protocol = window.location.protocol;
        const host = window.location.host;
        const qrLink = await QRCode.toDataURL(
          `${protocol}//${host}/caisse-unique-valiate-recu/${dataRecu.uuid}`
        );
        setQrCode(qrLink);
      }
    };

    generateQRCode();
  }, [caisseId, dataRecu, qrCode]);

  //   const receipt =
  //     data.dataElement && data.dataElement[0] ? data.dataElement[0] : null;

  if (!dataRecu) {
    return <div className="p-4 text-center">Pas de ticket valide.</div>;
  }

  return (
    <div className="p-4 print:p-2">
      <div className="mb-4 print:mb-0 print:hidden">
        <Button id={caisseId} onClick={() => window.print()} className="">
          Imprimer le reçu
        </Button>
      </div>
      <div className="print:m-0 print:p-0">
        <ReceiptContent2 receipt={dataRecu} qrCode={qrCode} />
        <ReceiptContent2 receipt={dataRecu} qrCode={qrCode} />
        <ReceiptContent2 receipt={dataRecu} qrCode={qrCode} />
      </div>
      {/* <ReceiptContent receipt={dataRecu} qrCode={qrCode} />
      <div className="page-break-before mt-8 print:mt-0">
        <ReceiptContent receipt={dataRecu} qrCode={qrCode} />
      </div> */}
    </div>
  );
}

export const ReceiptContent = ({
  receipt,
  qrCode,
}: {
  qrCode: string;
  receipt: CaisseInterface;
}) => (
  <div className="mx-auto max-w-2xl bg-white p-8 shadow-md print:shadow-none">
    <div className="mb-6 text-center">
      <Image
        src={logoArmoirieCongo}
        alt="Armoirie Congo"
        width={48}
        height={48}
        className="mx-auto mb-4"
      />
      <h1 className="text-xl font-bold uppercase">République du Congo</h1>
      <h2 className="text-lg font-semibold uppercase">
        Direction Générale des Transports Terrestres
      </h2>
    </div>

    <div className="mb-6">
      <h3 className="bg-black py-2 text-center text-xl font-bold uppercase text-white">
        Reçu de Caisse
      </h3>
      <p className="mt-2 bg-gray-200 py-1 text-center text-lg font-semibold">
        N° : {receipt?.id_payment ?? receipt?.numero_recu_caisse}
      </p>
    </div>

    <div className="mb-6 space-y-2">
      <p>
        <span className="font-semibold">Pour:</span>{" "}
        {receipt?.id_prestation?.nom}
      </p>
      <p>
        <span className="font-semibold">Intitulé:</span> {receipt?.intitule}
      </p>
      <p>
        <span className="font-semibold">Site:</span> {receipt.id_site.nom}
      </p>
      <p>
        <span className="font-semibold">En date de:</span>{" "}
        {format(new Date(receipt.created_at), "dd-MM-yyyy")}
      </p>
      <p>
        <span className="font-semibold">Pour un montant de:</span>{" "}
        {new Intl.NumberFormat("fr-FR", {
          style: "currency",
          currency: "XAF",
        }).format(Number(receipt.cout_total))}
      </p>
      <p>
        <span className="font-semibold">Caisse:</span> {receipt.id_user.nom}
      </p>
    </div>

    <div className="text-center">
      {qrCode && (
        <img src={qrCode} alt="QR Code" className="mx-auto mb-4 size-24" />
      )}
      <p className="text-sm">Imprimé le {format(new Date(), "dd-MM-yyyy")}</p>
    </div>
  </div>
);

export const ReceiptContent2 = ({
  receipt,
  qrCode,
  administration,
}: {
  qrCode: string;
  receipt: CaisseInterface;
  administration?: AdministrationInterface;
}) => (
  //   <div className="mx-auto w-full max-w-[210mm] border-b-2 border-dashed bg-white p-4 text-[10px] print:border-b">
  <div className="mx-auto w-full max-w-2xl border-b-2 border-dashed bg-white p-4 text-[13px] print:border-b-2">
    <div className="mb-2 flex items-center justify-start gap-2 text-start">
      <Image
        src={logoArmoirieCongo}
        alt="Armoirie Congo"
        width={50}
        height={50}
        className=""
      />
      <div className="flex flex-col">
        <h1 className="text-[12px] font-bold uppercase">République du Congo</h1>
        <h2 className="text-wrap text-[11px] font-semibold uppercase">
          {administration?.nom}
        </h2>
      </div>
    </div>

    <div className="mb-2">
      <h3 className="bg-black py-1 text-center text-[12px] font-bold uppercase text-white print:bg-black print:text-white">
        Reçu de Caisse
      </h3>
      <p className="mt-0.5 bg-gray-200 py-0.5 text-center text-[11px] font-semibold">
        N° : {receipt?.id_payment ?? receipt?.numero_recu_caisse}
      </p>
    </div>

    <div className="flex items-end justify-between">
      <div className="mb-2 space-y-0.5">
        <p>
          <span className="font-semibold">Pour:</span>{" "}
          {receipt.id_prestation.nom}
        </p>
        <p>
          <span className="font-semibold">Intitulé:</span> {receipt.intitule}
        </p>
        <p>
          <span className="font-semibold">Site:</span> {receipt.id_user.nom}
        </p>
        <p>
          <span className="font-semibold">En date de:</span>{" "}
          {format(new Date(receipt.created_at), "dd-MM-yyyy")}
        </p>
        <p>
          <span className="font-semibold">Pour un montant de:</span>{" "}
          {new Intl.NumberFormat("fr-FR", {
            style: "currency",
            currency: "XAF",
          }).format(Number(receipt.cout_total))}
        </p>
        <p>
          <span className="font-semibold">Caisse:</span> {receipt.id_user.nom}
        </p>
      </div>

      <div className="text-center">
        {qrCode && (
          <img src={qrCode} alt="QR Code" className="mx-auto mb-1 size-24" />
        )}
        <p className="text-[10px]">
          Imprimé le {format(new Date(), "dd-MM-yyyy")}
        </p>
      </div>
    </div>
  </div>
);
