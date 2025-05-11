"use client"

import { useState } from "react"
import { Building2, ChevronDown, Filter, MapPin, Plus, Search } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Sample data
const properties = [
  {
    id: 1,
    name: "Marina Waterfront Tower",
    location: "Dubai Marina",
    type: "Residential",
    price: 2500000,
    status: "Active",
    units: 45,
    occupiedUnits: 38,
    // Removed image property to prevent 404 errors
  },
  {
    id: 2,
    name: "Palm Residence Villa",
    location: "Palm Jumeirah",
    type: "Residential",
    price: 8500000,
    status: "Active",
    units: 1,
    occupiedUnits: 1,
    // Removed image property to prevent 404 errors
  },
  {
    id: 3,
    name: "Downtown Heights",
    location: "Downtown Dubai",
    type: "Mixed Use",
    price: 4200000,
    status: "Under Maintenance",
    units: 80,
    occupiedUnits: 65,
    // Removed image property to prevent 404 errors
  },
  {
    id: 4,
    name: "Bluewater Apartments",
    location: "Bluewaters Island",
    type: "Residential",
    price: 3400000,
    status: "Active",
    units: 25,
    occupiedUnits: 18,
    // Removed image property to prevent 404 errors
  },
  {
    id: 5,
    name: "Sheikh Zayed Office Tower",
    location: "Sheikh Zayed Road",
    type: "Commercial",
    price: 12000000,
    status: "Active",
    units: 120,
    occupiedUnits: 95,
    // Removed image property to prevent 404 errors
  },
  {
    id: 6,
    name: "Jumeirah Villas",
    location: "Jumeirah",
    type: "Residential",
    price: 6800000,
    status: "Under Renovation",
    units: 12,
    occupiedUnits: 8,
    // Removed image property to prevent 404 errors
  },
  {
    id: 7,
    name: "Silicon Oasis Tech Park",
    location: "Dubai Silicon Oasis",
    type: "Commercial",
    price: 9500000,
    status: "Active",
    units: 60,
    occupiedUnits: 42,
    // Removed image property to prevent 404 errors
  },
  {
    id: 8,
    name: "Business Bay Towers",
    location: "Business Bay",
    type: "Mixed Use",
    price: 15000000,
    status: "Active",
    units: 150,
    occupiedUnits: 120,
    // Removed image property to prevent 404 errors
  },
];

export default function PropertiesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<string[]>([]);
  const [filterStatus, setFilterStatus] = useState<string[]>([]);
  const [view, setView] = useState("grid");

  // Filter properties based on search and filters
  const filteredProperties = properties.filter((property) => {
    // Search filter
    if (
      searchQuery &&
      !property.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !property.location.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }

    // Type filter
    if (filterType.length > 0 && !filterType.includes(property.type)) {
      return false;
    }

    // Status filter
    if (filterStatus.length > 0 && !filterStatus.includes(property.status)) {
      return false;
    }

    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Properties</h1>
        <div className="flex items-center gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Property
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Add New Property</DialogTitle>
                <DialogDescription>
                  Enter the details of the new property to add to your portfolio.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">Name</Label>
                  <Input className="col-span-3" placeholder="Property name" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">Location</Label>
                  <Input className="col-span-3" placeholder="Address" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">Type</Label>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="residential">Residential</SelectItem>
                      <SelectItem value="commercial">Commercial</SelectItem>
                      <SelectItem value="mixed">Mixed Use</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">Price (AED)</Label>
                  <Input className="col-span-3" type="number" placeholder="Property price" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">Units</Label>
                  <Input className="col-span-3" type="number" placeholder="Number of units" />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Add Property</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      {/* Filters */}
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <div className="relative w-full sm:w-auto flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-neutral-500" />
          <Input
            placeholder="Search properties..."
            className="pl-8 bg-white"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full sm:w-[180px] justify-start">
                <Filter className="mr-2 h-4 w-4" />
                Type
                <ChevronDown className="ml-auto h-4 w-4 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[180px]">
              <DropdownMenuLabel>Filter by Type</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem
                checked={filterType.includes("Residential")}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setFilterType([...filterType, "Residential"]);
                  } else {
                    setFilterType(filterType.filter((t) => t !== "Residential"));
                  }
                }}
              >
                Residential
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={filterType.includes("Commercial")}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setFilterType([...filterType, "Commercial"]);
                  } else {
                    setFilterType(filterType.filter((t) => t !== "Commercial"));
                  }
                }}
              >
                Commercial
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={filterType.includes("Mixed Use")}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setFilterType([...filterType, "Mixed Use"]);
                  } else {
                    setFilterType(filterType.filter((t) => t !== "Mixed Use"));
                  }
                }}
              >
                Mixed Use
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full sm:w-[180px] justify-start">
                <Filter className="mr-2 h-4 w-4" />
                Status
                <ChevronDown className="ml-auto h-4 w-4 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[180px]">
              <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem
                checked={filterStatus.includes("Active")}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setFilterStatus([...filterStatus, "Active"]);
                  } else {
                    setFilterStatus(filterStatus.filter((s) => s !== "Active"));
                  }
                }}
              >
                Active
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={filterStatus.includes("Under Maintenance")}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setFilterStatus([...filterStatus, "Under Maintenance"]);
                  } else {
                    setFilterStatus(filterStatus.filter((s) => s !== "Under Maintenance"));
                  }
                }}
              >
                Under Maintenance
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={filterStatus.includes("Under Renovation")}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setFilterStatus([...filterStatus, "Under Renovation"]);
                  } else {
                    setFilterStatus(filterStatus.filter((s) => s !== "Under Renovation"));
                  }
                }}
              >
                Under Renovation
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Tabs defaultValue="grid" className="w-full sm:w-auto" onValueChange={(value) => setView(value)}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="grid">Grid View</TabsTrigger>
              <TabsTrigger value="table">Table View</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Display Properties */}
      {view === "grid" ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProperties.map((property) => (
            <Card key={property.id} className="overflow-hidden">
              <div className="aspect-video relative bg-neutral-100">
                <div className="bg-neutral-800 h-full w-full flex items-center justify-center">
                  <Building2 className="h-12 w-12 text-neutral-400" />
                </div>
                <Badge
                  className="absolute top-2 right-2"
                  variant={property.status === "Active" ? "default" : "secondary"}
                >
                  {property.status}
                </Badge>
              </div>
              <CardHeader className="pb-2">
                <CardTitle>{property.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center text-neutral-500 text-sm mb-2">
                  <MapPin className="h-4 w-4 mr-1" />
                  {property.location}
                </div>
                <div className="grid grid-cols-2 gap-2 mb-3">
                  <div>
                    <p className="text-xs text-neutral-500">Type</p>
                    <p className="font-medium">{property.type}</p>
                  </div>
                  <div>
                    <p className="text-xs text-neutral-500">Price</p>
                    <p className="font-medium">AED {property.price.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-xs text-neutral-500">Units</p>
                    <p className="font-medium">{property.units}</p>
                  </div>
                  <div>
                    <p className="text-xs text-neutral-500">Occupied</p>
                    <p className="font-medium">{property.occupiedUnits}</p>
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span>Occupancy</span>
                    <span className="font-medium">
                      {Math.round((property.occupiedUnits / property.units) * 100)}%
                    </span>
                  </div>
                  <Progress value={(property.occupiedUnits / property.units) * 100} />
                </div>
                <div className="mt-4 flex justify-end">
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Units</TableHead>
                <TableHead>Occupancy</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProperties.map((property) => (
                <TableRow key={property.id}>
                  <TableCell className="font-medium">{property.name}</TableCell>
                  <TableCell>{property.location}</TableCell>
                  <TableCell>{property.type}</TableCell>
                  <TableCell>AED {property.price.toLocaleString()}</TableCell>
                  <TableCell>{property.occupiedUnits}/{property.units}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress value={(property.occupiedUnits / property.units) * 100} className="h-2 w-20" />
                      <span className="text-sm">
                        {Math.round((property.occupiedUnits / property.units) * 100)}%
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={property.status === "Active" ? "default" : "secondary"}>
                      {property.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm">
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
