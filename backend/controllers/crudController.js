export function crudController(Model, searchable = []) {
  return {
    async list(req, res, next) {
      try {
        const { search, category, breed, availability, minPrice, maxPrice, age } = req.query;
        const query = {};
        if (category) query.category = category;
        if (breed) query.breed = breed;
        if (availability !== undefined) query.available = availability === 'true';
        if (age) query.age = Number(age);
        if (minPrice || maxPrice) query.price = {};
        if (minPrice) query.price.$gte = Number(minPrice);
        if (maxPrice) query.price.$lte = Number(maxPrice);
        if (search && searchable.length) {
          query.$or = searchable.map((field) => ({ [field]: { $regex: search, $options: 'i' } }));
        }
        const docs = await Model.find(query).sort({ createdAt: -1 });
        res.json(docs);
      } catch (error) {
        next(error);
      }
    },
    async get(req, res, next) {
      try {
        const doc = await Model.findById(req.params.id);
        if (!doc) return res.status(404).json({ message: 'Record not found.' });
        res.json(doc);
      } catch (error) {
        next(error);
      }
    },
    async create(req, res, next) {
      try {
        const doc = await Model.create({ ...req.body, createdBy: req.user?._id });
        res.status(201).json(doc);
      } catch (error) {
        next(error);
      }
    },
    async update(req, res, next) {
      try {
        const doc = await Model.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!doc) return res.status(404).json({ message: 'Record not found.' });
        res.json(doc);
      } catch (error) {
        next(error);
      }
    },
    async remove(req, res, next) {
      try {
        const doc = await Model.findByIdAndDelete(req.params.id);
        if (!doc) return res.status(404).json({ message: 'Record not found.' });
        res.json({ message: 'Deleted successfully.' });
      } catch (error) {
        next(error);
      }
    }
  };
}
