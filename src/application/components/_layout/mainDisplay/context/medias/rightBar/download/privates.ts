export const downloadMedia = (mediaIds: string[], label: string) => {
  const xhttp = new XMLHttpRequest()

  const baseUrl = process.env.ORIGIN_API_URL ?? ""

  xhttp.onreadystatechange = function () {
    let a
    if (xhttp.readyState === 4 && xhttp.status === 200) {
      a = document.createElement("a")
      a.href = window.URL.createObjectURL(xhttp.response)
      a.download = label
      a.style.display = "none"
      document.body && document.body.appendChild(a)
      a.click()
    }
  }
  // Post data to URL which handles post request
  xhttp.open("POST", baseUrl + "/media/download")
  xhttp.setRequestHeader("Content-Type", "application/json")
  // You should set responseType as blob for binary responses
  xhttp.responseType = "blob"
  xhttp.send(JSON.stringify(mediaIds))
}
