const formatDate = (date) => {
  return date.toISOString().split("T")[0]; // Mengembalikan tanggal dalam format YYYY-MM-DD
};

module.exports = { formatDate };
