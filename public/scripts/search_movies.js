function show(data) {
  let tab = `    <thead>
          <tr>
            <th>Title</th>
            <th>Overview</th>
            <th>Original Language</th>
            <th>Vote Count</th>
            <th>Vote Average</th>
            </tr>
            </thead>`;

  // Loop to access all rows
  data.forEach((movie) => {
    tab += `<tbody>
          <tr>
            <td>${movie.title}</td>
            <td>${movie.overview}</td>
            <td>${movie.original_language}</td>
            <td>${movie.vote_count}</td>
            <td>${movie.vote_average}</td>
            </tr>
            </tbdody>`;
  });
  // Setting innerHTML as tab variable
  document.getElementById("movies").innerHTML = tab;
}
const moviesSearch = async () => {
  const searchVal = document.getElementById("searchInput").value;
  try {
    const ref = await fetch(`/api/movies/?search=${searchVal}`);
    var searchResults = await ref.json();
    console.log(searchResults);
    show(searchResults);
  } catch (e) {
    console.log(e);
    console.log("could not search api");
  }
};
