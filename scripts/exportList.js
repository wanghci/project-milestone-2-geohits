function init() {
    console.log('initialize the page')
    populateLocalStorageFromURLSearch() // Added so that the page doesn't need a refresh to work
    populateFromLocalStorage()
    document.getElementById('export-list').addEventListener('click', exportClick)
  }

  function populateFromLocalStorage() {
    console.log('populateFromLocalStorage')
    //handle loading from localStorage
    const list = localStorage.getItem('playList');
  }

  function populateLocalStorageFromURLSearch() {
    console.log('populateLocalStorageFromURLSearch')
    
    // PERSISTODON SOLUTION
    
    // 1. when the page loads, look to see if the url has a querystring that has the kind of data you added to it above
    const currentURLSearch = window.location.search
    if (currentURLSearch.length > 0) {

      // 2. if there is such data in the querystring, replace the state in localStorage with the data in the URL
      const decoded = new URLSearchParams(currentURLSearch)
      if (decoded.has('list')) {
        const items = decoded.getAll('list')
        localStorage.setItem('playlist-info', JSON.stringify(list))
      }
    }
  }

function exportClick(ev) {
    // TODO add a feature to create "transportodons" (export the current todo items as a json file) by completing the steps below:

    // TODO 1. get the current stringified state from localStorage
    let list = localStorage.getItem("playList")
    // TODO 2. create a new Blob object from the stringified state with the type set to "application/json"
    let blob =  new Blob([list], {type: "application/json"})
    // TODO 3. create an object URL for the Blob object
    let url = URL.createObjectURL(blob)
    // *** Now, we want to automatically download said Blob ***

    // TODO 4. create a link (<a>) which has as its href set to the result from the preceding step
    let link = document.createElement("a")
    link.href = url
    // TODO 5. set the link's download attribute to "transportodons.json" -- this specifies the default filename for the download
    link.download = "playlist.json"
    // TODO 6. add the link to the downloads container (with the id="downloads") in the provided html
    document.getElementById("export-list").appendChild(link)
    // TODO 7. write the javascript to call .click() on the newly added link (https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/click)
    link.click();
  }
  init()