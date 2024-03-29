import PostModel from "../models/post.js";

export const getAll = async (req, res) => {
    try {
        const posts = await PostModel.find().populate({path: "user", select: ["name", "avatar"]}).exec();
        res.json(posts);
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Не вдалось отримати статтю',
        });
    }
};
export const getOne = async (req, res) => {
    try {
        const postId = req.param.id;

        PostModel.findOneAndUpdate(
            {
                _id: postId,
            },
            {
                $inc: {viewsCount: 1},
            },
            {
                returnDocument: 'after',
            },
            (err, doc) => {
                if (err) {
                    console.log(err)
                    return res.status(500).json({
                        message: 'Не вдалось повернути статтю',
                    });
                }

                if (!doc) {
                    return res.status(404).json({
                        message: 'Статя не знайдена',
                    });
                }

                res.json(doc);
            },
        );
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Не вдалось отримати статтю',
        });
    }
};
export const remove = async (req, res) => {
    try {
        const postId = req.param.id;

        PostModel.findOneAndDelete(
            {
                _id: postId,
            },
            (err, doc) => {
                if (err) {
                    console.log(err)
                    return res.status(500).json({
                        message: 'Не вдалось видалити статтю',
                    });
                }

                if (!doc) {
                    return res.status(404).json({
                        message: 'Статья не знайдена',
                    });
                }

                res.json({
                    success: true,
                });
            },
        );
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Не вдалось отримати статтю',
        });
    }
};
export const create = async (req, res) => {
    try {
        const doc = new PostModel({
            title: req.body.title,
            text: req.body.text,
            imageUrl: req.body.imageUrl,
            tags: req.body.tags,
            user: req.userId,
        });

        const post = await doc.save();

        res.json(post);
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Не вдалось створити статтю ',
        });
    }
};
export const update = async (req, res) => {
    try {
        const postId = req.params.id;

        await PostModel.updateOne({
                _id: postId,
            },
            {
                title: req.body.title,
                text: req.body.text,
                imageUrl: req.body.imageUrl,
                tags: req.body.tags,
                user: req.userId,
            },
        );

        res.json({
            success: true,
        });
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Не вдалось оновити статтю ',
        });
    }
};

