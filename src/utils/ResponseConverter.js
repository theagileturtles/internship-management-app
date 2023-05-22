
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

export function oppurtunityTypeConverter(type){
  switch (type) {
    case "summer":
      return {alias:type, label: "Summer Term Internship"}
    case "long":
      return {alias:type, label: "Long Term Internship"}
    default:
      break;
  }
}

export function internshipStatusConverter(status){
    switch (status) {
      case "pending_for_coordinator":
        return {alias:status, label: "Pending for Coordinator"}
      case "rejected":
        return {alias:status, label: "Rejected", color:"red"}
      case "pending_for_sgk":
        return {alias:status, label: "Pending for SGK Entry"}
      case "approved":
        return {alias:status, label: "Approved"}
      default:
        break;
    }
  }

  export function letterStatusConverter(status){
    switch (status) {
      case "pending":
        return {alias:status, label: "Pending"}
      case "completed":
        return {alias:status, label: "Completed"}
      default:
        break;
    }
  }