import { Link2, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "../../components/button";
import { api } from "../../lib/axios";

interface ImportantLinksProps {
  openCreateLinkModal: () => void;
}

interface LinksList {
  id: string;
  title: string;
  url: string;
}
[];

export function ImportantLinks({ openCreateLinkModal }: ImportantLinksProps) {
  const { tripId } = useParams();

  const [linksList, setLinksList] = useState<LinksList[]>([]);

  useEffect(() => {
    api
      .get(`trips/${tripId}/links`)
      .then((response) => setLinksList(response.data.links));
  }, [tripId]);

  return (
    <div className="space-y-6 ">
      <h2 className="text-xl text-zinc-50 font-semibold">Links importantes</h2>

      <div className="space-y-5">
        {linksList.map((link) => {
          return (
            <div
              key={link.id}
              className="flex items-center justify-between gap-4"
            >
              <div className="space-y-1.5 flex-1">
                <span className="block font-medium text-zinc-100 ">
                  {link.title}
                </span>
                <a
                  href="#"
                  className="block text-zinc-400 text-xs truncate hover:text-zinc-200"
                >
                  {link.url}
                </a>
              </div>
              <Link2 className="size-5 text-zinc-400" />
            </div>
          );
        })}
      </div>

      <Button onClick={openCreateLinkModal} variant="secondary" size="full">
        <Plus className="size-5 text-zinc-200" />
        <p className="text-zinc-200">Cadastrar novo link</p>
      </Button>
    </div>
  );
}
