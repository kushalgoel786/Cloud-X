import { getStorage } from "firebase-admin/storage";
import { StatusCodes } from "http-status-codes";
import { File } from "../server.js";

export const getAllFiles = async (req, res) => {
  const files = await File.findAll({
    where: {
      owner: req.user.userId,
    },
  });
  res.status(StatusCodes.OK).json({ files });
};

export const addFile = async (req, res) => {
  req.body.owner = req.user.userId;

  // supabase
  const file = await File.create(req.body);
  const fileName = file.id.toString();

  // firebase / gcp
  const bucket = getStorage().bucket();
  const fileRef = bucket.file(fileName);

  // add file type to signed url for upload,
  // so that only that file type can be uploaded
  const signingOptions = {
    version: "v4",
    action: "write",
    expires: Date.now() + 1 * 60 * 1000,
  };

  const [url] = await fileRef.getSignedUrl(signingOptions);

  res.status(StatusCodes.CREATED).json({ url });
};

export const getFile = async (req, res) => {
  const { id } = req.params;
  const file = await File.findOne({
    where: {
      id,
    },
  });

  // Firebase
  const fileName = id.toString();
  const bucket = getStorage().bucket();
  const fileRef = bucket.file(fileName);

  const signingOptions = {
    version: "v4",
    action: "read",
    expires: Date.now() + 1 * 60 * 1000,
  };

  //Check for empty file name
  //fileRef.exists()

  // const url = await getDownloadURL(fileRef);
  const [url] = await fileRef.getSignedUrl(signingOptions);

  res.status(StatusCodes.OK).json({ file, url });
};

export const deleteFile = async (req, res) => {
  const { id } = req.params;
  //Supabase
  const removedFile = await File.destroy({ where: { id } });

  //Firebase
  const fileName = id.toString();
  const bucket = getStorage().bucket();
  const fileRef = bucket.file(fileName);
  await fileRef.delete();

  res.status(StatusCodes.OK).json({ msg: "File deleted" });
};

/* 
import mongoose from 'mongoose';
import day from 'dayjs';

export const getAllJobs = async (req, res) => {
  const { search, jobStatus, jobType, sort } = req.query;

  const queryObject = {
    createdBy: req.user.userId,
  };

  if (search) {
    queryObject.$or = [
      { position: { $regex: search, $options: 'i' } },
      { company: { $regex: search, $options: 'i' } },
    ];
  }

  if (jobStatus && jobStatus !== 'all') {
    queryObject.jobStatus = jobStatus;
  }
  if (jobType && jobType !== 'all') {
    queryObject.jobType = jobType;
  }

  const sortOptions = {
    newest: '-createdAt',
    oldest: 'createdAt',
    'a-z': 'position',
    'z-a': '-position',
  };

  const sortKey = sortOptions[sort] || sortOptions.newest;

  // setup pagination

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const jobs = await Job.find(queryObject)
    .sort(sortKey)
    .skip(skip)
    .limit(limit);

  const totalJobs = await Job.countDocuments(queryObject);
  const numOfPages = Math.ceil(totalJobs / limit);
  res
    .status(StatusCodes.OK)
    .json({ totalJobs, numOfPages, currentPage: page, jobs });
};

export const updateJob = async (req, res) => {
  const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(StatusCodes.OK).json({ msg: 'job modified', job: updatedJob });
};



export const showStats = async (req, res) => {
  let stats = await Job.aggregate([
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
    { $group: { _id: '$jobStatus', count: { $sum: 1 } } },
  ]);

  stats = stats.reduce((acc, curr) => {
    const { _id: title, count } = curr;
    acc[title] = count;
    return acc;
  }, {});

  const defaultStats = {
    pending: stats.pending || 0,
    interview: stats.interview || 0,
    declined: stats.declined || 0,
  };

  let monthlyApplications = await Job.aggregate([
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
    {
      $group: {
        _id: { year: { $year: '$createdAt' }, month: { $month: '$createdAt' } },
        count: { $sum: 1 },
      },
    },
    { $sort: { '_id.year': -1, '_id.month': -1 } },
    { $limit: 6 },
  ]);

  monthlyApplications = monthlyApplications
    .map((item) => {
      const {
        _id: { year, month },
        count,
      } = item;

      const date = day()
        .month(month - 1)
        .year(year)
        .format('MMM YY');

      return { date, count };
    })
    .reverse();

  res.status(StatusCodes.OK).json({ defaultStats, monthlyApplications });
};


*/
