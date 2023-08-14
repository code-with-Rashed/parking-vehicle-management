import { reactive } from "vue";
export default function useDateProccessing() {
  const readableDate = (givenDate = null) => {
    const date = new Date(givenDate);
    return new Intl.DateTimeFormat("en-us", {
      dateStyle: "long",
      timeStyle: "short",
      timeZone: "Asia/Dhaka",
    }).format(date);
  };
  const outgoingDate = () => {
    const date = new Date();
    return new Intl.DateTimeFormat("en-us", {
      dateStyle: "short",
      timeStyle: "short",
      timeZone: "Asia/Dhaka",
    }).format(date);
  };

  const time = reactive({
    totalHour: null,
    totalMinute: null,
  });

  const totalHoursMinutes = async (incommingTime) => {
    const incommingDateTime = new Date(incommingTime);
    const outgoingDateTime = new Date();
    let diff = (outgoingDateTime - incommingDateTime) / 1000;
    diff /= 60 * 60;

    let incommingMinutes = incommingDateTime.getMinutes();
    let outgoingMinutes = outgoingDateTime.getMinutes();
    time.totalHour = Math.abs(Math.floor(diff));
    time.totalMinute = Math.abs(outgoingMinutes - incommingMinutes);
  };
  const charges = (incommingTime, hourlyCharges) => {
    totalHoursMinutes(incommingTime);
    const chargeByHour = hourlyCharges * time.totalHour;
    const chargeByMinute = (hourlyCharges / 60) * time.totalMinute;
    const totalCharge = Math.ceil(chargeByHour + chargeByMinute);
    return totalCharge;
  };
  return {
    readableDate,
    outgoingDate,
    time,
    charges,
  };
}
