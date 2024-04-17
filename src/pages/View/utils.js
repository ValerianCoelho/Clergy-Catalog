export async function fetchDetails(db, query) {
  try {
    const people = await db.select(query);

    // Create an array of promises for fetching donations
    const donationPromises = people.map((person) =>
      db.select(`SELECT * FROM donation WHERE sbn=${person.sbn}`)
    );

    // Wait for all donation promises to resolve
    const donationsList = await Promise.all(donationPromises);

    // Combine person and donation data
    const details = people.map((person, index) => ({
      ...person,
      donations: donationsList[index],
    }));
    return details;
  } catch (error) {
    console.error("Error fetching details:", error);
  }
}
