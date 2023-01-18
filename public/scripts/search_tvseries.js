const wineView = (wine) => `
<div class="col-12">

<table class="table table-condensed table-bordered">
        <thead>
          <tr>
            <th>Title</th>
            <th>Release_Year</th>
            <th>Runtime</th>
            <th>Genre</th>
            <th>Rating</th>
            <th>Cast</th>
            <th>Synopsis</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>${wine.Title}</td>
            <td>${wine.Release_Year}</td>
            <td>${wine.Runtime}</td>
            <td>${wine.Genre}</td>
            <td>${wine.Rating}</td>
            <td>${wine.Cast}</td>
            <td>${wine.Synopsis}</td>

            <td class="text-center">
              <a
                href="/series/update/${wine._id}"
                class="btn btn-info btn-xs"
                ><span class="glyphicon glyphicon-edit"></span> Edit</a
              >
              <a
                href="/series/delete/${wine._id}"
                class="btn btn-danger btn-xs"
                ><span class="glyphicon glyphicon-remove"></span> Del</a
              >
            </td>
          </tr>
        </tbody>
      </table>
       </div>

`;

const tvseriesSearch = async () => {
  const searchVal = document.querySelector("#searchInput").value;
  try {
    const wineDomRef = document.querySelector("#wineItems");
    const ref = await fetch(`/api/series/?search=${searchVal}`);
    const searchResults = await ref.json();
    let wineHtml = [];
    searchResults.forEach((serie) => {
      wineHtml.push(wineView(serie));
    });
    wineDomRef.innerHTML = wineHtml.join("");
  } catch (e) {
    console.log(e);
    console.log("could not search api");
  }
};
