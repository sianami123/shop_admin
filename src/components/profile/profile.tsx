import { useEffect, useState } from "react";
import Layout from "../layout/layout";
import { authAPI } from "../../api/api";

interface JWT {
  expire_in: number;
  header: {
    typ: string;
    alg: string;
  };
  payload: {
    iat: number;
    exp: number;
    email: string;
    id: string;
    site: string;
    username: string;
    iss: string;
  };
  token: string;
}

interface UserData {
  user: {
    ID: string;
    display_name: string;
    user_email: string;
    user_login: string;
    user_nicename: string;
    user_registered: string;
    user_url: string;
    user_activation_key: string;
    user_status: string;
  };
  roles: string[];
  jwt: JWT[];
}

export default function Profile() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await authAPI.validateToken();
        console.log("API Response:", response);
        console.log("User Data:", response.data);
        setUserData(response.data.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUser();
  }, []);

  if (isLoading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-full">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </Layout>
    );
  }

  if (!userData || !userData.user) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-full">
          <div className="text-red-600">Failed to load user data</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-4">
            <h1 className="text-2xl font-bold text-white">Profile</h1>
          </div>

          <div className="p-6 space-y-6">
            <div className="flex items-center space-x-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <svg
                  className="w-16 h-16 text-blue-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  ></path>
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-800">
                  {userData.user.display_name}
                </h2>
                <div className="flex space-x-2 mt-1">
                  {userData.roles.map((role) => (
                    <span
                      key={role}
                      className="px-2 py-1 text-sm bg-blue-100 text-blue-800 rounded"
                    >
                      {role}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600">
                    Email
                  </label>
                  <div className="mt-1 text-gray-900">
                    {userData.user.user_email}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600">
                    Username
                  </label>
                  <div className="mt-1 text-gray-900">
                    {userData.user.user_login}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600">
                    Display Name
                  </label>
                  <div className="mt-1 text-gray-900">
                    {userData.user.user_nicename}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600">
                    Website
                  </label>
                  <div className="mt-1">
                    <a
                      href={userData.user.user_url}
                      className="text-blue-600 hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {userData.user.user_url}
                    </a>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600">
                    Member Since
                  </label>
                  <div className="mt-1 text-gray-900">
                    {new Date(
                      userData.user.user_registered
                    ).toLocaleDateString()}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600">
                    User ID
                  </label>
                  <div className="mt-1 text-gray-900">{userData.user.ID}</div>
                </div>
              </div>
            </div>

            {/* JWT Information */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Session Information
              </h3>
              {userData.jwt[0] && (
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-600">
                      Session Expires In
                    </label>
                    <div className="mt-1 text-gray-900">
                      {Math.floor(userData.jwt[0].expire_in / 60)} minutes
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600">
                      Authentication Type
                    </label>
                    <div className="mt-1 text-gray-900">
                      {userData.jwt[0].header.typ} ({userData.jwt[0].header.alg}
                      )
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
