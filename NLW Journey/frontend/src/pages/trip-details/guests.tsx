import { CheckCircle2, CircleDashed, UserCog } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "../../components/button";
import { api } from "../../lib/axios";

interface Participant {
  id: string;
  name: string | null;
  email: string;
  is_confirmed: boolean;
}
interface GuestsProps {
  openCreateGuestsModal: () => void;
}

export function Guests({ openCreateGuestsModal }: GuestsProps) {
  const { tripId } = useParams();
  const [participants, setParticipants] = useState<Participant[] | undefined>(
    []
  );

  useEffect(() => {
    api
      .get(`/trips/${tripId}/participants`)
      .then((response) => setParticipants(response.data.participants));
  }, [tripId]);

  return (
    <div className="space-y-6">
      <h2 className="text-xl text-zinc-50 font-semibold">Convidados</h2>
      <div className="space-y-5">
        {participants?.map((participant: Participant, index: number) => {
          return (
            <div
              key={participant.id}
              className="flex items-center justify-between"
            >
              <div className="space-y-1.5">
                <span className="block font-medium text-zinc-100 ">
                  {participant.name ?? `Convidado ${index}`}
                </span>
                <span className="block text-zinc-400 text-sm truncate">
                  {participant.email}
                </span>
              </div>
              {participant.is_confirmed ? (
                <CheckCircle2 className="size-5 text-green-400 shrink-0" />
              ) : (
                <CircleDashed className="size-5 text-zinc-400 shrink-0" />
              )}
            </div>
          );
        })}
      </div>
      <Button onClick={openCreateGuestsModal} variant="secondary" size="full">
        <UserCog className="size-5 text-zinc-200" />
        <p className="text-zinc-200">Gerenciar convidados</p>
      </Button>
    </div>
  );
}
