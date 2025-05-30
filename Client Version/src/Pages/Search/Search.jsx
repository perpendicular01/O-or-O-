"use client";

import { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import { CiLocationOn } from "react-icons/ci";
import { MdOutlineEmail } from "react-icons/md";
import { LuPhone } from "react-icons/lu";
import { IoSearchOutline } from "react-icons/io5";
import { toast } from "react-toastify";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { FaRegHeart } from "react-icons/fa";

const SearchPage = () => {
  const [searchData, setSearchData] = useState({
    bloodGroup: "",
    district: "",
    upazila: "",
  });

  const [searchResults, setSearchResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  const [districts, setDistricts] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [upazilas, setUpazilas] = useState([]);

  const axiosPublic = useAxiosPublic()

  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  useEffect(() => {
    fetch("https://bdapi.editboxpro.com/api/districts")
      .then(res => res.json())
      .then(data => setDistricts(data))
      .catch(err => console.error("Failed to fetch districts", err));
  }, []);

  useEffect(() => {
    if (selectedDistrict) {
      fetch(`https://bdapi.editboxpro.com/api/upazilas/${selectedDistrict.toLowerCase()}`)
        .then(res => res.json())
        .then(data => setUpazilas(data))
        .catch(err => console.error("Failed to fetch upazilas", err));
    } else {
      setUpazilas([]);
    }
  }, [selectedDistrict]);

  const handleSearch = async () => {
    const params = new URLSearchParams();
    if (searchData.bloodGroup) params.append("bloodGroup", searchData.bloodGroup);
    if (searchData.district) params.append("district", searchData.district);
    if (searchData.upazila) params.append("upazila", searchData.upazila);

    try {
      const res = await axiosPublic(`/donors/search?${params.toString()}`);
      setSearchResults(res.data);
      setHasSearched(true);
    } catch (error) {
      console.error("Search failed:", error);
      toast.error("Failed to fetch donor search results.");
    }
  };


  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-800">Find Blood Donors</h2>
          <p className="text-gray-500 text-lg">Search for blood donors in your area</p>
        </div>

        <div className="bg-white rounded-lg shadow-md mb-8">
          <div className="p-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="text-xl">
                <IoSearchOutline />
              </div>
              <h3 className="text-lg font-semibold text-gray-800">Search Donors</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div>
                <label className="text-sm font-medium text-gray-700">Blood Group</label>
                <select
                  className="w-full mt-1 p-2 border rounded-md text-gray-700"
                  value={searchData.bloodGroup}
                  onChange={(e) => setSearchData({ ...searchData, bloodGroup: e.target.value })}
                >
                  <option value="">Select group</option>
                  {bloodGroups.map((group) => (
                    <option key={group} value={group}>
                      {group}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">District</label>
                <select
                  className="w-full mt-1 p-2 border rounded-md text-gray-700"
                  value={searchData.district}
                  onChange={(e) => {
                    setSearchData({ ...searchData, district: e.target.value, upazila: "" });
                    setSelectedDistrict(e.target.value);
                  }}
                >
                  <option value="">Select district</option>
                  {districts.map((d) => (
                    <option key={d.id} value={d.name}>
                      {d.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Upazila</label>
                <select
                  className="w-full mt-1 p-2 border rounded-md text-gray-700"
                  value={searchData.upazila}
                  onChange={(e) => setSearchData({ ...searchData, upazila: e.target.value })}
                  disabled={!searchData.district}
                >
                  <option value="">Select upazila</option>
                  {upazilas.map((u) => (
                    <option key={u.id} value={u.name}>{u.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <button
              className="flex items-center justify-center gap-2 mx-auto bg-red-600 text-white py-1 px-10 rounded"
              onClick={handleSearch}
            >
              <div className="text-xl"><IoSearchOutline /></div>
              <h2> Search </h2>
            </button>
          </div>
        </div>

        {/* Results */}
        {hasSearched && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-800 ml-6">
              {searchResults.length} Donor{searchResults.length !== 1 && "s"} Found
            </h3>

            {searchResults.length === 0 ? (
              <div className="bg-white rounded-lg shadow-md py-12 text-center">
                <Heart className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <p className="text-lg text-gray-700">No matching donors found.</p>
                <button
                  className="mt-4 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded"
                  onClick={() => setHasSearched(false)}
                >
                  Try Again
                </button>
              </div>
            ) : (
              <div className="w-[80%] mx-auto lg:w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {searchResults.map((donor) => (
                  <div key={donor._id} className="bg-white rounded-lg shadow-md w-[330px]">
                    <div className="p-5">
                      <div className="flex gap-4">
                        <div className="h-16 w-16 rounded-full overflow-hidden">
                          <img src={donor.image} className="object-cover w-full h-full" />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <h4 className="text-lg font-bold">{donor.name}</h4>
                            <h2 className="text-xs bg-green-200 text-green-800 font-medium rounded-full px-2 py-1">
                              {donor.availability || "Available"}
                            </h2>
                          </div>
                          <div className="text-sm text-gray-600 mt-2 space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="text-redd border border-red-300 rounded-full px-3 py-1 text-xs font-semibold">
                                {donor.group}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 mt-1">
                              <div className="text-xl font-extrabold"><CiLocationOn /></div>
                              {donor.upazila}, {donor.district}
                            </div>
                          </div>
                          <div className="flex gap-2 mt-4">
                            <a href={`tel:${donor.phone}`} className="bg-redd/90 flex items-center gap-1 text-white font-bold py-1 px-3 rounded text-xs">
                              <div className="text-base"><LuPhone /></div>
                              <h2>Call</h2>
                            </a>
                            <a href={`mailto:${donor.email}`} className="border border-gray-300 flex items-center gap-1 text-black font-bold py-1 px-3 rounded text-xs">
                              <div className="text-lg"><MdOutlineEmail /></div>
                              <h2>Email</h2>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {!hasSearched && (
          <div className="bg-white rounded-lg shadow-md text-center py-12 mt-8">
            <div className="flex justify-center text-gray-300 text-4xl mb-3">
            <FaRegHeart />
            </div>
            <p className="text-lg text-gray-700">Fill in the form to find donors</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
