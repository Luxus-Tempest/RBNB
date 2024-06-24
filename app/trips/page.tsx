import EmptyState from "@/app/components/EmptyState";
import ClientOnly from "@/app/components/ClientOnly";

import getCurrentUser from "@/app/actions/getCurrentUser";
import getReservations from "@/app/actions/getReservations";

import TripsClient from "./TripsClient";
import { FaCircleUser, FaUserLock } from "react-icons/fa6";
import { FaUserCheck, FaUserClock } from "react-icons/fa";

const TripsPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <div className=" flex flex-col gap-1 items-center h-full  ">
        <FaUserLock size={78} />
        <ClientOnly>
          <EmptyState title="Unauthorized" subtitle="Please login" />
        </ClientOnly>
      </div>
    );
  }

  const reservations = await getReservations({ userId: currentUser.id });

  if (reservations?.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No trips found"
          subtitle="Looks like you havent reserved any trips."
          //showReset={true}
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <TripsClient reservations={reservations} currentUser={currentUser} />
    </ClientOnly>
  );
};

export default TripsPage;
