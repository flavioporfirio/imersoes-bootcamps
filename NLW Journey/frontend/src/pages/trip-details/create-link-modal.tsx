import { Link2, Tag, X } from "lucide-react";
import { FormEvent } from "react";
import { useParams } from "react-router-dom";
import { Button } from "../../components/button";
import { api } from "../../lib/axios";

interface CreateLinkModalProps {
  closeCreateLinkModal: () => void;
}

export function CreateLinkModal({
  closeCreateLinkModal,
}: CreateLinkModalProps) {
  const { tripId } = useParams();

  async function createLink(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    const title = data.get("title")?.toString();
    const url = data.get("url")?.toString();

    console.log(title, url);

    if (!title || !url) return;

    await api.post(`/trips/${tripId}/links`, {
      title,
      url,
    });

    window.document.location.reload();
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Cadastrar link</h2>

            <button onClick={closeCreateLinkModal}>
              <X className="size-5 text-zinc-400" />
            </button>
          </div>

          <p className="text-zinc-400 text-sm">
            Todos convidados podem visuzalizar os links importantes.
          </p>
        </div>

        <form onSubmit={createLink} className="space-y-3">
          <div className="h-14 px-4 bg-zinc-950 border  border-zinc-800 rounded-lg flex items-center gap-2">
            <Tag className="size-5 text-zinc-400" />
            <input
              type="text"
              name="title"
              placeholder="Título do link"
              className="bg-transparent text-lg placeholder-zinc-400 w-40 outline-none flex-1"
            />
          </div>

          <div className="flex-1 h-14 px-4 bg-zinc-950 border  border-zinc-800 rounded-lg flex items-center gap-2">
            <Link2 className="size-5 text-zinc-400" />
            <input
              type="text"
              name="url"
              placeholder="URL"
              className="bg-transparent text-lg placeholder-zinc-400 w-40 outline-none flex-1 "
            />
          </div>
          <Button variant="primary" size="full">
            Salvar link
          </Button>
        </form>
      </div>
    </div>
  );
}
