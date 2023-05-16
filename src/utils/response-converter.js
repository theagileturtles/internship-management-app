
export function typeConverter(type){
    switch (type) {
      case "compulsory1":
        return {alias:type, label: "Compulsary 1"}
      case "compulsory2":
        return {alias:type, label: "Compulsary 2"}
      case "voluntary":
        return {alias:type, label: "Voluntary"}
      default:
        break;
    }
}

export function statusConverter(status){
    switch (status) {
      case "pending_for_coordinator":
        return {alias:status, label: "Pending for Coordinator"}
      case "rejected":
        return {alias:status, label: "Rejected"}
      case "pending_for_sgk":
        return {alias:status, label: "Pending for SGK Entry"}
      case "approved":
        return {alias:status, label: "Approved"}
      default:
        break;
    }
  }