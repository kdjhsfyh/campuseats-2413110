import { useEffect, useState } from "react";

function isVendorOpen(openHours, date = new Date()) {
  const times = openHours.match(/(\d{1,2}):(\d{2})\s*(am|pm)/gi);

  if (!times || times.length < 2) {
    return false;
  }

  const toMinutes = (time) => {
    const match = time.match(/(\d{1,2}):(\d{2})\s*(am|pm)/i);

    let hour = Number(match[1]);
    const minute = Number(match[2]);
    const period = match[3].toLowerCase();

    if (period === "am" && hour === 12) hour = 0;
    if (period === "pm" && hour !== 12) hour += 12;

    return hour * 60 + minute;
  };

  const openingTime = toMinutes(times[0]);
  const closingTime = toMinutes(times[1]);

  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Kuala_Lumpur",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);

  const hour = Number(parts.find((part) => part.type === "hour").value);
  const minute = Number(parts.find((part) => part.type === "minute").value);

  const currentTime = hour * 60 + minute;

  if (openingTime < closingTime) {
    return currentTime >= openingTime && currentTime < closingTime;
  }

  // Also supports cafés that close after midnight.
  return currentTime >= openingTime || currentTime < closingTime;
}

function VendorCard({ vendor, isSelected, onSelect }) {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date());
    }, 60_000);

    return () => clearInterval(interval);
  }, []);

  const isOpen = isVendorOpen(vendor.openHours, now);

  return (
    <button
      type="button"
      className={`card vendor-card ${isSelected ? "selected" : ""}`}
      onClick={() => onSelect(vendor.id)}
    >
      <div className="thumb">{vendor.name.charAt(0)}</div>

      <div>
        <h3>{vendor.name}</h3>
        <p className="muted">{vendor.location}</p>
        <p className="muted">{vendor.openHours}</p>

        <span className={`status ${isOpen ? "open" : "closed"}`}>
          {isOpen ? "Open" : "Closed"}
        </span>
      </div>
    </button>
  );
}

export default VendorCard;
