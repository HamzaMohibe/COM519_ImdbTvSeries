function show(data) {
  let tab = `    <thead>
          <tr>
            <th>Title</th>
            <th>Release_Year</th>
            <th>Runtime</th>
            <th>Genre</th>
            <th>Rating</th>
            <th>Cast</th>
            <th>Synopsis</th>
            </tr>
            </thead>`;

  // Loop to access all rows
  data.forEach((serie) => {
    tab += `<tbody>
          <tr>
            <td>${serie.Title}</td>
            <td>${serie.Release_Year}</td>
            <td>${serie.Runtime}</td>
            <td>${serie.Genre}</td>
            <td>${serie.Rating}</td>
            <td>${serie.Cast}</td>
            <td>${serie.Synopsis}</td>
            </tr>
            </tbdody>`;
  });
  // Setting innerHTML as tab variable
  document.getElementById("tv_series").innerHTML = tab;
}
const tvseriesSearch = async () => {
  const searchVal = document.getElementById("searchInput").value;
  try {
    const ref = await fetch(`/api/series/?search=${searchVal}`);
    var searchResults = await ref.json();
    console.log(searchResults);
    show(searchResults);
  } catch (e) {
    console.log(e);
    console.log("could not search api");
  }
};
