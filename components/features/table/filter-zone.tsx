"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Calendar as CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { cn } from "@/src/lib/utils";
import { MultiSelect } from "@/components/custom/ui/multi-select";
import { OptionsFilterOpCaisse } from "@/types/app_types";

interface FiltreZone {
  date_start: Date;
  date_end: Date;
  id_site: any[];
  id_partenaire: any[];
  id_prestation: any[];
  is_agregat: boolean;
}

export default function FilterZone({
  optionsFilter,
}: {
  optionsFilter: OptionsFilterOpCaisse;
}) {
  const [inFiltering, setInFiltering] = useState<boolean>(false);
  const [filters, setFilters] = useState<FiltreZone>({
    date_start: new Date(),
    date_end: new Date(),
    id_site: [],
    id_partenaire: [],
    id_prestation: [],
    is_agregat: false,
  });

  useEffect(() => {
    // Fonction pour envoyer la requête
    const sendRequest = async () => {
      try {
        const response = await fetch("/api/filter", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(filters),
        });
        if (!response.ok) {
          throw new Error("Erreur lors de l'envoi des filtres");
        }
        const data = await response.json();
        console.log("Réponse de l'API:", data);
      } catch (error) {
        console.error("Erreur:", error);
      }
    };

    // sendRequest();
  }, [filters]);

  const handleDateChange = (field: string, newDate?: Date) => {
    const date = newDate ?? new Date();
    setFilters((prev) => {
      const newFilters = { ...prev, [field]: date };
      if (field === "date_start" && date > prev.date_end) {
        newFilters.date_end = date;
      } else if (field === "date_end" && date < prev.date_start) {
        newFilters.date_start = date;
      }
      return newFilters;
    });
  };

  const handleSelectChange = (
    field: "id_site" | "id_prestation" | "id_partenaire",
    value: any[]
  ) => {
    setFilters((prev) => {
      const updatedField = prev[field].includes(value)
        ? prev[field].filter((item: any) => item !== value)
        : [...prev[field], value];
      return { ...prev, [field]: updatedField };
    });
    // setFilters((prev) => ({
    //   ...prev,
    //   [field]: prev[field].includes(value)
    //     ? prev[field].filter((item) => item !== value)
    //     : [...prev[field], value],
    // }));
  };

  return (
    <div className="my-4 flex flex-wrap items-center gap-6">
      <div className="flex space-x-4">
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="date_start">Date de début</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="date_start"
                variant={"outline"}
                disabled={inFiltering}
                className={cn(
                  " justify-start text-left font-normal",
                  !filters.date_start && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 size-4" />
                {filters.date_start ? (
                  format(filters.date_start, "PPP", { locale: fr })
                ) : (
                  <span>Choisir une date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={filters.date_start}
                onSelect={(date) => handleDateChange("date_start", date)}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="date_end">Date de fin</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="date_end"
                variant={"outline"}
                disabled={inFiltering}
                className={cn(
                  " justify-start text-left font-normal",
                  !filters.date_end && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 size-4" />
                {filters.date_end ? (
                  format(filters.date_end, "PPP", { locale: fr })
                ) : (
                  <span>Choisir une date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={filters.date_end}
                onSelect={(date) => handleDateChange("date_end", date)}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <div className="flex space-x-4">
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="id_site">Site</Label>
          <MultiSelect
            options={optionsFilter.sites}
            onValueChange={(value) => handleSelectChange("id_site", value)}
            disabled={inFiltering}
            lang="fr"
            // defaultValue={selectedFrameworks}
            placeholder="Sélectionner sites"
            variant="inverted"
            animation={2}
            maxCount={optionsFilter.sites.length}
          />
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="id_partenaire">Partenaire</Label>
          <MultiSelect
            options={optionsFilter.partenaires}
            onValueChange={(value) =>
              handleSelectChange("id_partenaire", value)
            }
            lang="fr"
            disabled={inFiltering}
            // defaultValue={selectedFrameworks}
            placeholder="Sélectionner partenaires"
            variant="inverted"
            animation={2}
            maxCount={optionsFilter.partenaires.length}
          />
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="id_prestation">Prestation</Label>
          <MultiSelect
            options={optionsFilter.prestations}
            lang="fr"
            onValueChange={(value) =>
              handleSelectChange("id_prestation", value)
            }
            disabled={inFiltering}
            // defaultValue={selectedFrameworks}
            placeholder="Sélectionner prestations"
            variant="inverted"
            animation={2}
            maxCount={optionsFilter.prestations.length}
          />
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox
          id="is_agregat"
          checked={filters.is_agregat}
          disabled={inFiltering}
          onCheckedChange={(checked) => {
            console.log({ checked });
            setFilters((prev) => ({
              ...prev,
              is_agregat: typeof checked === "boolean" ? checked : false,
            }));
          }}
        />
        <Label htmlFor="is_agregat">Agrégat</Label>
      </div>
    </div>
  );
}
