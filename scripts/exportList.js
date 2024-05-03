function exportClick() {
    let list = localStorage.getItem("playList")
    let blob =  new Blob([list], {type: "application/json"})
    let url = URL.createObjectURL(blob)
    let link = document.createElement("a")
    link.href = url
    link.download = "playlist.json"
    link.click();
  }

  document.getElementById('export-list').addEventListener('click', exportClick)