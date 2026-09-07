import { asyncHandler } from '../utils/apiResponse.js';
import Enquiry from '../models/Enquiry.js';
import Contact from '../models/Contact.js';
import Warehouse from '../models/Warehouse.js';

export const getDashboardStats = asyncHandler(async (req, res) => {
  const [
    totalEnquiries,
    totalContacts,
    pendingEnquiries,
    pendingContacts,
    totalWarehouses,
    availableWarehouses,
    recentEnquiries,
    recentContacts,
  ] = await Promise.all([
    Enquiry.countDocuments(),
    Contact.countDocuments(),
    Enquiry.countDocuments({ status: 'new' }),
    Contact.countDocuments({ status: 'new' }),
    Warehouse.countDocuments(),
    Warehouse.countDocuments({ status: 'available' }),
    Enquiry.find().sort({ createdAt: -1 }).limit(5),
    Contact.find().sort({ createdAt: -1 }).limit(5),
  ]);

  res.json({
    success: true,
    data: {
      overview: {
        totalEnquiries,
        totalContacts,
        pendingEnquiries,
        pendingContacts,
        totalLeads: totalEnquiries + totalContacts,
        totalWarehouses,
        availableWarehouses,
        bookedWarehouses: totalWarehouses - availableWarehouses,
      },
      recentEnquiries,
      recentContacts,
    },
  });
});

export const getLeadStats = asyncHandler(async (req, res) => {
  const enquiryStats = await Enquiry.aggregate([
    {
      $group: {
        _id: '$status',
        count: { $sum: 1 },
      },
    },
  ]);
  const contactStats = await Contact.aggregate([
    {
      $group: {
        _id: '$status',
        count: { $sum: 1 },
      },
    },
  ]);
  res.json({
    success: true,
    data: {
      enquiryStats,
      contactStats,
    },
  });
});
