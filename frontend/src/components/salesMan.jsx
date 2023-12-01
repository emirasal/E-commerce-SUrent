import React from 'react'

function ProfitChart() {

  const handleGraphSubmit = (event) => {
    event.preventDefault(); // Prevent the form from being submitted normally

    // Get the start and end date values
    const startDate = document.getElementById('start').value;
    const endDate = document.getElementById('end').value;
    console.log("asdadada");
    // Redirect to the desired page with the date values in the URL
    window.location.href = '/revenue/' + startDate + '/' + endDate;
  }




  return (
    <div>

      <h4>Display the revenue and loss/profit chart </h4>

      <form id="dateForm" onSubmit={handleGraphSubmit}>
        <label for="start">Start Date:</label>
        <input type="date" id="start" name="start" />

        <label for="end">End Date:</label>
        <input type="date" id="end" name="end" />

        <button type="submit">Submit</button>
      </form>


    </div>
  )
}

export default ProfitChart