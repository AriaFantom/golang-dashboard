import { PlayerList } from "@/components/screens/panel/players";

export default function PlayersPage() {
  return (
    <section className="flex flex-col mx-20 mt-24 justify-center min-h-screen">
      <PlayerList />
    </section>
  );
}
