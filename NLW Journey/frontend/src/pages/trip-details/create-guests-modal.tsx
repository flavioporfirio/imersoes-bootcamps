import { format } from "date-fns";
import { Mail, User, X } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "../../components/button";
import { api } from "../../lib/axios";

interface CreateGuestsModal {
  closeCreateGuestsModal: () => void;
}

interface Trip {
  id: string;
  destination: string;
  starts_at: string;
  ends_at: string;
  is_confirmed: boolean;
}

interface Participants {
  id: string;
  name: string;
  email: string;
  is_confirmed: boolean;
}
[];

export function CreateGuestsModal({
  closeCreateGuestsModal,
}: CreateGuestsModal) {
  const { tripId } = useParams();
  const [tripData, setTripData] = useState<Trip | undefined>();
  const [participants, setParticipants] = useState<Participants[]>([]);

  useEffect(() => {
    api
      .get(`/trips/${tripId}`)
      .then((response) => setTripData(response.data.trip));
  }, [tripId]);

  useEffect(() => {
    api
      .get(`/trips/${tripId}/participants`)
      .then((response) => setParticipants(response.data.participants));
  }, [tripId]);

  const displayedDate = tripData
    ? format(tripData?.starts_at, "d' de ' LLL")
        .concat(" até ")
        .concat(format(tripData?.ends_at, "d' de ' LLL"))
    : null;

  function findConfirmingParticipant(name: string | undefined, email: string) {
    return participants.filter(
      (participant) => participant.email === email || participant.name === name
    );
  }

  async function confirmGuest(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    const name = data.get("name")?.toString();
    const email = data.get("email")?.toString();

    if (!email) return;

    const participant = findConfirmingParticipant(name, email);

    if (!participant[0].id) return;
    console.log(typeof participant[0].id, participant[0].id);

    await api.patch(`/participants/${participant[0].id}/confirm`);
  }
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Confirmar participação</h2>

            <button onClick={closeCreateGuestsModal}>
              <X className="size-5 text-zinc-400" />
            </button>
          </div>

          <p className="text-zinc-400 text-sm">
            Você foi convidado(a) para participar de uma viagem para{" "}
            <span className="font-semibold text-zinc-100">
              {tripData?.destination}
            </span>{" "}
            nas datas de{" "}
            <span className="font-semibold text-zinc-100">{displayedDate}</span>
            .
          </p>

          <p className="text-zinc-400 text-sm">
            Para confirmar sua presença na viagem, preencha os dados abaixo:
          </p>
        </div>

        <form onSubmit={confirmGuest} className="space-y-3">
          <div className="h-14 px-4 bg-zinc-950 border  border-zinc-800 rounded-lg flex items-center gap-2">
            <User className="size-5 text-zinc-400" />
            <input
              type="text"
              name="name"
              placeholder="Seu nome completo"
              className="bg-transparent text-lg placeholder-zinc-400 w-40 outline-none flex-1"
            />
          </div>

          <div className="flex-1 h-14 px-4 bg-zinc-950 border  border-zinc-800 rounded-lg flex items-center gap-2">
            <Mail className="size-5 text-zinc-400" />
            <input
              type="email"
              name="email"
              placeholder="Seu e-mail"
              className="bg-transparent text-lg placeholder-zinc-400 w-40 outline-none flex-1 "
            />
          </div>
          <Button variant="primary" size="full">
            Confirmar minha presença
          </Button>
        </form>
      </div>
    </div>
  );
}
