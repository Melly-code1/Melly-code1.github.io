import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, User, Calendar, Shield, Users } from "lucide-react";

export default function Profile() {
  const [, setLocation] = useLocation();
  const [isAdultVerified, setIsAdultVerified] = useState(false);
  const [adultForm, setAdultForm] = useState({ name: "", dateOfBirth: "" });
  const [childProfiles, setChildProfiles] = useState([
    { id: 1, name: "TestUser", password: "****" }
  ]);
  const [newChild, setNewChild] = useState({ name: "", password: "" });
  const [showAddChild, setShowAddChild] = useState(false);

  const handleAdultVerification = (e: React.FormEvent) => {
    e.preventDefault();
    if (adultForm.name && adultForm.dateOfBirth) {
      // Check if adult (simple check for demo - in real app would verify age)
      const birthDate = new Date(adultForm.dateOfBirth);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      
      if (age >= 18) {
        setIsAdultVerified(true);
      } else {
        alert("Adult verification required. Must be 18 or older.");
      }
    }
  };

  const handleAddChild = (e: React.FormEvent) => {
    e.preventDefault();
    if (newChild.name && newChild.password) {
      const newId = Math.max(...childProfiles.map(p => p.id)) + 1;
      setChildProfiles([...childProfiles, { id: newId, ...newChild }]);
      setNewChild({ name: "", password: "" });
      setShowAddChild(false);
    }
  };

  const handleChangePassword = (childId: number) => {
    const newPassword = prompt("Enter new password:");
    if (newPassword) {
      setChildProfiles(childProfiles.map(child => 
        child.id === childId ? { ...child, password: newPassword } : child
      ));
    }
  };

  const handleDeleteChild = (childId: number) => {
    if (confirm("Are you sure you want to delete this child profile?")) {
      setChildProfiles(childProfiles.filter(child => child.id !== childId));
    }
  };

  if (!isAdultVerified) {
    return (
      <div className="bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen p-4">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <Button
              variant="ghost"
              onClick={() => setLocation("/")}
              className="flex items-center gap-2 text-blue-600"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Button>
            <h1 className="text-3xl font-inter font-bold text-gray-800">Profile Settings</h1>
            <div></div>
          </div>

          <Card className="shadow-lg">
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Shield className="w-8 h-8 text-blue-600" />
              </div>
              <CardTitle className="text-2xl font-inter font-bold text-gray-800">
                Adult Verification Required
              </CardTitle>
              <CardDescription className="text-gray-600">
                Please verify you are an adult to manage child profiles and settings.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAdultVerification} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="adult-name" className="text-sm font-inter font-semibold text-gray-700">
                    Adult Name
                  </Label>
                  <Input
                    id="adult-name"
                    type="text"
                    placeholder="Enter your full name"
                    value={adultForm.name}
                    onChange={(e) => setAdultForm({ ...adultForm, name: e.target.value })}
                    className="rounded-xl border-2 border-gray-200 focus:border-blue-500"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="adult-dob" className="text-sm font-inter font-semibold text-gray-700">
                    Date of Birth
                  </Label>
                  <Input
                    id="adult-dob"
                    type="date"
                    value={adultForm.dateOfBirth}
                    onChange={(e) => setAdultForm({ ...adultForm, dateOfBirth: e.target.value })}
                    className="rounded-xl border-2 border-gray-200 focus:border-blue-500"
                    required
                  />
                </div>

                <Button 
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-inter font-bold py-3 rounded-xl"
                >
                  Verify Adult Access
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <Button
            variant="ghost"
            onClick={() => setLocation("/")}
            className="flex items-center gap-2 text-blue-600"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Button>
          <h1 className="text-3xl font-inter font-bold text-gray-800">Profile Management</h1>
          <div></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Adult Profile */}
          <Card className="shadow-lg">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <CardTitle className="text-xl font-inter font-bold text-gray-800">
                    Adult Profile
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    Verified adult account
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label className="text-sm font-inter font-semibold text-gray-700">Name</Label>
                  <p className="text-lg font-inter text-gray-800">{adultForm.name}</p>
                </div>
                <div>
                  <Label className="text-sm font-inter font-semibold text-gray-700">Date of Birth</Label>
                  <p className="text-lg font-inter text-gray-800">{adultForm.dateOfBirth}</p>
                </div>
                <div className="flex items-center gap-2 text-green-600">
                  <Shield className="w-4 h-4" />
                  <span className="text-sm font-inter font-semibold">Verified Adult</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Child Profiles */}
          <Card className="shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <CardTitle className="text-xl font-inter font-bold text-gray-800">
                      Child Profiles
                    </CardTitle>
                    <CardDescription className="text-gray-600">
                      Manage child accounts
                    </CardDescription>
                  </div>
                </div>
                <Button
                  onClick={() => setShowAddChild(true)}
                  className="bg-green-500 hover:bg-green-600 text-white font-inter font-bold rounded-xl px-4 py-2"
                >
                  Add Child
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {childProfiles.map((child) => (
                  <div key={child.id} className="border rounded-xl p-4 bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-inter font-semibold text-gray-800">{child.name}</p>
                        <p className="text-sm text-gray-600">Password: {child.password}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleChangePassword(child.id)}
                          className="font-inter font-semibold"
                        >
                          Change Password
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDeleteChild(child.id)}
                          className="font-inter font-semibold"
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Add Child Modal */}
        {showAddChild && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <Card className="w-full max-w-md m-4">
              <CardHeader>
                <CardTitle className="text-xl font-inter font-bold text-gray-800">
                  Add New Child
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAddChild} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="child-name" className="text-sm font-inter font-semibold text-gray-700">
                      Child Name
                    </Label>
                    <Input
                      id="child-name"
                      type="text"
                      placeholder="Enter child's name"
                      value={newChild.name}
                      onChange={(e) => setNewChild({ ...newChild, name: e.target.value })}
                      className="rounded-xl border-2 border-gray-200 focus:border-blue-500"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="child-password" className="text-sm font-inter font-semibold text-gray-700">
                      Password
                    </Label>
                    <Input
                      id="child-password"
                      type="password"
                      placeholder="Enter password"
                      value={newChild.password}
                      onChange={(e) => setNewChild({ ...newChild, password: e.target.value })}
                      className="rounded-xl border-2 border-gray-200 focus:border-blue-500"
                      required
                    />
                  </div>

                  <div className="flex gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setShowAddChild(false)}
                      className="flex-1 font-inter font-semibold rounded-xl"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      className="flex-1 bg-green-500 hover:bg-green-600 text-white font-inter font-bold rounded-xl"
                    >
                      Add Child
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}