"use client";

import { trackApplyClick } from "@/lib/analytics";
import { openRequestInviteModal } from "@/components/RequestInviteModal";

export function EventDetailCTA() {
  const handleClick = () => {
    trackApplyClick("event_detail_page");
    openRequestInviteModal();
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="bg-[#5a9a9b] px-8 py-3.5 text-[11px] font-medium uppercase tracking-[0.2em] text-white transition-colors duration-300 hover:bg-[#4d8889]"
    >
      Request Access to Future Rooms
    </button>
  );
}
