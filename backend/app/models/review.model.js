module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      module: String,
      semester: String,
      description: String,
      expected: String,
      grade: String,
      rating: String,
      submitter: String,
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Review = mongoose.model("review", schema);
  return Review;
};
