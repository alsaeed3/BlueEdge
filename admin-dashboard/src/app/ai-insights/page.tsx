"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from "recharts";
import {
  BrainCircuit,
  Calendar,
  DollarSign,
  Download,
  FileText,
  LineChart as LineChartIcon,
  RefreshCw,
  Sparkles,
  TrendingUp,
  ZoomIn,
} from "lucide-react";

// Sample data for predictive pricing model
const pricingPredictionData = [
  { name: "Jan", actual: 2300, predicted: 2250 },
  { name: "Feb", actual: 2400, predicted: 2300 },
  { name: "Mar", actual: 2200, predicted: 2280 },
  { name: "Apr", actual: 2500, predicted: 2400 },
  { name: "May", actual: 2600, predicted: 2550 },
  { name: "Jun", actual: 2750, predicted: 2700 },
  { name: "Jul", actual: 2900, predicted: 2800 },
  { name: "Aug", actual: null, predicted: 3000 },
  { name: "Sep", actual: null, predicted: 3100 },
  { name: "Oct", actual: null, predicted: 3050 },
  { name: "Nov", actual: null, predicted: 3200 },
  { name: "Dec", actual: null, predicted: 3350 },
];

// Sample data for occupancy prediction
const occupancyPredictionData = [
  { name: "Jan", actual: 82, predicted: 80 },
  { name: "Feb", actual: 84, predicted: 82 },
  { name: "Mar", actual: 83, predicted: 84 },
  { name: "Apr", actual: 86, predicted: 85 },
  { name: "May", actual: 87, predicted: 86 },
  { name: "Jun", actual: 88, predicted: 87 },
  { name: "Jul", actual: 88, predicted: 89 },
  { name: "Aug", actual: null, predicted: 90 },
  { name: "Sep", actual: null, predicted: 91 },
  { name: "Oct", actual: null, predicted: 89 },
  { name: "Nov", actual: null, predicted: 88 },
  { name: "Dec", actual: null, predicted: 90 },
];

// Sample data for investment opportunity analysis
const investmentOpportunityData = [
  {
    area: "Dubai Marina",
    roi: 6.8,
    risk: 35,
    growth: 12,
    liquidity: 80,
    rating: 4.2,
  },
  {
    area: "Downtown Dubai",
    roi: 7.2,
    risk: 40,
    growth: 15,
    liquidity: 75,
    rating: 4.5,
  },
  {
    area: "Palm Jumeirah",
    roi: 8.5,
    risk: 45,
    growth: 18,
    liquidity: 70,
    rating: 4.7,
  },
  {
    area: "Jumeirah Lake Towers",
    roi: 6.2,
    risk: 30,
    growth: 10,
    liquidity: 85,
    rating: 4.0,
  },
  {
    area: "Business Bay",
    roi: 7.8,
    risk: 38,
    growth: 14,
    liquidity: 78,
    rating: 4.3,
  },
];

// Sample data for market segmentation
const marketSegmentData = [
  { name: "Luxury Villas", value: 35 },
  { name: "Apartments", value: 45 },
  { name: "Commercial", value: 15 },
  { name: "Mixed Use", value: 5 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

// Sample anomaly detection data
const anomalyProperties = [
  {
    id: 1,
    name: "Marina Waterfront Tower",
    anomalyType: "Price Undervaluation",
    confidence: 87,
    description: "Property may be undervalued by 15% compared to similar properties in the area.",
    recommendation: "Consider price adjustment or identify value-adding renovations.",
  },
  {
    id: 2,
    name: "Downtown Heights",
    anomalyType: "Occupancy Decline",
    confidence: 92,
    description: "Unexpected 18% occupancy drop in the last quarter compared to historical data.",
    recommendation: "Investigate maintenance issues or local market conditions affecting demand.",
  },
  {
    id: 3,
    name: "Sheikh Zayed Office Tower",
    anomalyType: "Maintenance Issue",
    confidence: 78,
    description: "Unusual pattern of maintenance requests indicating potential systemic issue.",
    recommendation: "Schedule comprehensive inspection of plumbing and electrical systems.",
  },
  {
    id: 4,
    name: "Bluewater Apartments",
    anomalyType: "Revenue Anomaly",
    confidence: 84,
    description: "Revenue consistently 12% below projections despite high occupancy.",
    recommendation: "Review rental terms and ensure no unapproved discounts are being offered.",
  },
];

// Sample sentiment analysis data
const sentimentData = [
  { subject: "Overall Rating", score: 4.2, fullMark: 5 },
  { subject: "Location", score: 4.5, fullMark: 5 },
  { subject: "Amenities", score: 3.8, fullMark: 5 },
  { subject: "Management", score: 4.0, fullMark: 5 },
  { subject: "Value", score: 3.9, fullMark: 5 },
  { subject: "Maintenance", score: 3.7, fullMark: 5 },
];

export default function AIInsightsPage() {
  const [selectedTimeframe, setSelectedTimeframe] = useState("yearly");
  const [selectedProperty, setSelectedProperty] = useState("all");

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">AI Insights</h1>
          <p className="text-neutral-500">
            AI-powered analytics and predictions for your real estate portfolio
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh Data
          </Button>
          <Button size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Insights
          </Button>
        </div>
      </div>

      <Tabs defaultValue="predictions">
        <TabsList className="grid grid-cols-4 mb-4">
          <TabsTrigger value="predictions">Predictive Analytics</TabsTrigger>
          <TabsTrigger value="anomalies">Anomaly Detection</TabsTrigger>
          <TabsTrigger value="sentiment">Tenant Sentiment</TabsTrigger>
          <TabsTrigger value="investment">Investment Analysis</TabsTrigger>
        </TabsList>

        {/* Predictive Analytics Tab */}
        <TabsContent value="predictions" className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center mb-4">
            <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Timeframe" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="quarterly">Quarterly</SelectItem>
                <SelectItem value="yearly">Yearly</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedProperty} onValueChange={setSelectedProperty}>
              <SelectTrigger className="w-[240px]">
                <SelectValue placeholder="Select Property" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Properties</SelectItem>
                <SelectItem value="marina">Marina Waterfront Tower</SelectItem>
                <SelectItem value="downtown">Downtown Heights</SelectItem>
                <SelectItem value="palm">Palm Residence Villa</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {/* Pricing Predictions Chart */}
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Rental Price Predictions</CardTitle>
                <CardDescription>
                  Actual vs predicted average price per sq ft (AED)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={pricingPredictionData}>
                      <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis fontSize={12} tickLine={false} axisLine={false} />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="actual"
                        stroke="#2563eb"
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        activeDot={{ r: 6 }}
                        name="Actual Price"
                      />
                      <Line
                        type="monotone"
                        dataKey="predicted"
                        stroke="#10b981"
                        strokeWidth={2}
                        strokeDasharray="5 5"
                        dot={{ r: 4 }}
                        activeDot={{ r: 6 }}
                        name="Predicted Price"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4">
                  <p className="text-sm font-medium">Key Insights:</p>
                  <ul className="list-disc text-sm pl-5 pt-2 text-neutral-600">
                    <li>Predicted 15% increase in rental prices over the next 6 months</li>
                    <li>Seasonal fluctuations expected during summer months</li>
                    <li>Luxury segment showing strongest price growth potential</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Occupancy Predictions Chart */}
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Occupancy Rate Predictions</CardTitle>
                <CardDescription>
                  Actual vs predicted occupancy rates (%)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={occupancyPredictionData}>
                      <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        domain={[75, 95]}
                        tickFormatter={(value) => `${value}%`}
                      />
                      <Tooltip formatter={(value) => [`${value}%`, "Occupancy"]} />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="actual"
                        stroke="#2563eb"
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        activeDot={{ r: 6 }}
                        name="Actual Occupancy"
                      />
                      <Line
                        type="monotone"
                        dataKey="predicted"
                        stroke="#10b981"
                        strokeWidth={2}
                        strokeDasharray="5 5"
                        dot={{ r: 4 }}
                        activeDot={{ r: 6 }}
                        name="Predicted Occupancy"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4">
                  <p className="text-sm font-medium">Key Insights:</p>
                  <ul className="list-disc text-sm pl-5 pt-2 text-neutral-600">
                    <li>Predicted peak occupancy of 91% in September</li>
                    <li>Commercial properties expected to see highest growth in occupancy</li>
                    <li>Dubai Marina properties show consistent occupancy trends</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>AI-Powered Recommendations</CardTitle>
              <CardDescription>
                Strategic recommendations based on predictive analytics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="mr-4 mt-1">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <TrendingUp className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium">Optimize Pricing Strategy</h3>
                    <p className="text-sm text-neutral-600 mt-1">
                      Based on predictive analytics, increase rental rates for Downtown properties by 8-10% over the next quarter to align with forecasted market growth while maintaining competitive positioning.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="mr-4 mt-1">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <Calendar className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium">Timing for New Acquisitions</h3>
                    <p className="text-sm text-neutral-600 mt-1">
                      Our AI model predicts a 5% market dip in Q4, presenting an optimal window for property acquisitions in Business Bay and JLT areas with an estimated 12% ROI over 3 years.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="mr-4 mt-1">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium">Maintenance Planning</h3>
                    <p className="text-sm text-neutral-600 mt-1">
                      Schedule preventive maintenance for Sheikh Zayed Office Tower in August when occupancy is predicted to be lowest, minimizing disruption while addressing potential issues before they affect tenant satisfaction.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Anomaly Detection Tab */}
        <TabsContent value="anomalies" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Anomaly Detection</CardTitle>
              <CardDescription>
                AI-identified unusual patterns in your property data
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {anomalyProperties.map((property) => (
                  <div 
                    key={property.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between border-b pb-4 last:border-b-0 last:pb-0"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center">
                        <Sparkles className="h-5 w-5 text-amber-500 mr-2" />
                        <h3 className="font-medium">{property.name}</h3>
                      </div>
                      <Badge variant="outline" className="bg-amber-50">
                        {property.anomalyType}
                      </Badge>
                      <p className="text-sm text-neutral-600 mt-1">{property.description}</p>
                    </div>
                    <div className="mt-4 sm:mt-0 flex flex-col items-end">
                      <div className="flex items-center">
                        <span className="text-sm text-neutral-500 mr-2">Confidence:</span>
                        <span className="font-medium">{property.confidence}%</span>
                      </div>
                      <div className="mt-2 w-48">
                        <Progress value={property.confidence} className="h-1" />
                      </div>
                      <p className="text-xs text-neutral-500 mt-2 text-right">
                        <span className="font-medium">Recommendation:</span> {property.recommendation}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Anomaly Insights</CardTitle>
                <CardDescription>
                  Understanding unusual patterns in your data
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-sm text-neutral-600">
                    Our AI system has analyzed historical patterns across your property portfolio 
                    and detected several anomalies that may represent opportunities or risks.
                  </p>
                  
                  <div className="bg-neutral-50 p-4 rounded-lg border">
                    <h4 className="font-medium">Key Findings</h4>
                    <ul className="list-disc text-sm pl-5 pt-2 text-neutral-600">
                      <li>3 properties showing unexplained maintenance cost increases</li>
                      <li>Unexpected occupancy fluctuations in Downtown area</li>
                      <li>Rental yield anomalies in 2 commercial properties</li>
                      <li>Unusual pattern in tenant turnover for Marina properties</li>
                    </ul>
                  </div>
                  
                  <Button variant="outline" className="w-full">
                    <ZoomIn className="h-4 w-4 mr-2" />
                    View Detailed Analysis Report
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Anomaly Detection Model</CardTitle>
                <CardDescription>
                  How our AI identifies unusual patterns
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-sm text-neutral-600">
                    Our anomaly detection system uses advanced machine learning algorithms to identify 
                    patterns that deviate significantly from expected behavior across your property portfolio.
                  </p>
                  
                  <div className="space-y-2">
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span>Data Collection</span>
                        <span>100%</span>
                      </div>
                      <Progress value={100} className="h-1" />
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span>Pattern Analysis</span>
                        <span>100%</span>
                      </div>
                      <Progress value={100} className="h-1" />
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span>Anomaly Identification</span>
                        <span>100%</span>
                      </div>
                      <Progress value={100} className="h-1" />
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span>Risk Assessment</span>
                        <span>85%</span>
                      </div>
                      <Progress value={85} className="h-1" />
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span>Recommendation Generation</span>
                        <span>90%</span>
                      </div>
                      <Progress value={90} className="h-1" />
                    </div>
                  </div>
                  
                  <p className="text-xs text-neutral-500">
                    Last model update: 3 days ago • Accuracy score: 92.4%
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Tenant Sentiment Tab */}
        <TabsContent value="sentiment" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Tenant Sentiment Analysis</CardTitle>
                <CardDescription>
                  AI-powered analysis of tenant feedback and reviews
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart outerRadius={90} data={sentimentData}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="subject" />
                      <PolarRadiusAxis angle={30} domain={[0, 5]} />
                      <Radar
                        name="Tenant Satisfaction"
                        dataKey="score"
                        stroke="#2563eb"
                        fill="#3b82f6"
                        fillOpacity={0.6}
                      />
                      <Tooltip />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4 text-center">
                  <p className="text-xl font-bold">4.2/5</p>
                  <p className="text-sm text-neutral-500">Overall Tenant Satisfaction</p>
                </div>
              </CardContent>
            </Card>

            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Sentiment Breakdown</CardTitle>
                <CardDescription>
                  Analysis of tenant feedback by sentiment category
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Positive Sentiment</span>
                      <span className="font-medium">68%</span>
                    </div>
                    <Progress value={68} className="h-2 bg-neutral-200">
                      <div className="h-full bg-green-500 rounded-full" />
                    </Progress>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Neutral Sentiment</span>
                      <span className="font-medium">22%</span>
                    </div>
                    <Progress value={22} className="h-2 bg-neutral-200">
                      <div className="h-full bg-blue-500 rounded-full" />
                    </Progress>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Negative Sentiment</span>
                      <span className="font-medium">10%</span>
                    </div>
                    <Progress value={10} className="h-2 bg-neutral-200">
                      <div className="h-full bg-red-500 rounded-full" />
                    </Progress>
                  </div>

                  <div className="pt-4">
                    <h4 className="font-medium mb-2">Key Insights from Feedback:</h4>
                    <ul className="list-disc text-sm pl-5 text-neutral-600">
                      <li>Maintenance response time is the top concern (mentioned in 42% of negative feedback)</li>
                      <li>Building amenities received the most positive comments (65% of positive feedback)</li>
                      <li>Security and safety features are highly appreciated by tenants</li>
                      <li>Suggestions for improved communal areas in 3 properties</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>AI-Generated Feedback Summary</CardTitle>
              <CardDescription>
                Automatically summarized tenant feedback by property
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="border-b pb-4">
                  <h3 className="font-medium mb-2">Marina Waterfront Tower</h3>
                  <p className="text-sm text-neutral-600">
                    Tenants consistently praise the building's location, views, and security features. 
                    Common concerns include elevator waiting times during peak hours and the need for 
                    updated gym equipment. Recent improvements to the lobby area have been well-received, 
                    with a 15% increase in positive sentiment over the last quarter.
                  </p>
                  <div className="flex items-center mt-2">
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100">89% Positive</Badge>
                    <span className="text-xs text-neutral-500 ml-2">Based on 124 feedback instances</span>
                  </div>
                </div>

                <div className="border-b pb-4">
                  <h3 className="font-medium mb-2">Downtown Heights</h3>
                  <p className="text-sm text-neutral-600">
                    Tenant feedback highlights appreciation for the modern design and building amenities. 
                    The most frequent complaints relate to parking space limitations and occasional 
                    maintenance delays. The new online maintenance request system has improved sentiment 
                    by 22% compared to previous manual processes.
                  </p>
                  <div className="flex items-center mt-2">
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100">76% Positive</Badge>
                    <span className="text-xs text-neutral-500 ml-2">Based on 98 feedback instances</span>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Sheikh Zayed Office Tower</h3>
                  <p className="text-sm text-neutral-600">
                    Commercial tenants value the prestigious location and building management services. 
                    Recent HVAC system issues have contributed to a decline in sentiment over the past 
                    month. Suggestions frequently mention the need for updated conference facilities and 
                    improved high-speed internet coverage in certain areas of the building.
                  </p>
                  <div className="flex items-center mt-2">
                    <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">62% Positive</Badge>
                    <span className="text-xs text-neutral-500 ml-2">Based on 85 feedback instances</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Investment Analysis Tab */}
        <TabsContent value="investment" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="col-span-2">
              <CardHeader>
                <CardTitle>Investment Opportunity Analysis</CardTitle>
                <CardDescription>
                  AI evaluation of potential real estate investments
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={investmentOpportunityData}>
                      <XAxis dataKey="area" fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis fontSize={12} tickLine={false} axisLine={false} />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="roi" name="ROI %" fill="#2563eb" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="growth" name="Growth Potential %" fill="#10b981" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="risk" name="Risk Score" fill="#f87171" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4">
                  <p className="text-sm font-medium">Key Investment Insights:</p>
                  <ul className="list-disc text-sm pl-5 pt-2 text-neutral-600">
                    <li>Palm Jumeirah offers highest ROI but with increased risk profile</li>
                    <li>JLT provides most balanced risk-reward ratio for new investments</li>
                    <li>Downtown Dubai shows strongest long-term growth potential</li>
                    <li>Business Bay emerging as strong contender for commercial investments</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Market Segmentation</CardTitle>
                <CardDescription>
                  Distribution of investment opportunities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={marketSegmentData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {marketSegmentData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`${value}%`, "Market Share"]} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4">
                  <p className="text-sm font-medium">AI Investment Recommendations:</p>
                  <div className="space-y-2 mt-2">
                    <div className="flex items-center">
                      <Badge className="bg-[#0088FE]/10 text-[#0088FE] border-[#0088FE] mr-2">
                        Luxury
                      </Badge>
                      <span className="text-sm text-neutral-600">Focus on Palm Jumeirah and Emirates Hills</span>
                    </div>
                    <div className="flex items-center">
                      <Badge className="bg-[#00C49F]/10 text-[#00C49F] border-[#00C49F] mr-2">
                        Apartments
                      </Badge>
                      <span className="text-sm text-neutral-600">Expand in Downtown and JLT areas</span>
                    </div>
                    <div className="flex items-center">
                      <Badge className="bg-[#FFBB28]/10 text-[#FFBB28] border-[#FFBB28] mr-2">
                        Commercial
                      </Badge>
                      <span className="text-sm text-neutral-600">Consider Business Bay opportunities</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>AI-Powered Investment Strategy</CardTitle>
              <CardDescription>
                Optimizing your real estate portfolio for maximum returns
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="mr-4 mt-1">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <LineChartIcon className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium">Portfolio Diversification Strategy</h3>
                    <p className="text-sm text-neutral-600 mt-1">
                      Our AI analysis suggests redistributing 15% of your current residential-heavy portfolio into commercial properties in Business Bay and DIFC to optimize risk-adjusted returns. This strategy is projected to increase overall portfolio ROI by 2.3% while reducing volatility by 8%.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="mr-4 mt-1">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <TrendingUp className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium">Growth Opportunity Identification</h3>
                    <p className="text-sm text-neutral-600 mt-1">
                      Based on predictive market analysis, we've identified emerging growth zones in Al Jaddaf and Meydan areas with projected appreciation of 12-15% over the next 36 months, significantly above market average. Early investment in these areas offers substantial upside potential.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="mr-4 mt-1">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <BrainCircuit className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium">Market Timing Intelligence</h3>
                    <p className="text-sm text-neutral-600 mt-1">
                      Our AI model has detected cyclical patterns suggesting optimal acquisition windows in Q1 2024 for residential properties and Q3 2024 for commercial assets. This counter-cyclical approach is estimated to provide a 5-8% pricing advantage over standard market entry points.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="mr-4 mt-1">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <DollarSign className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium">Value-Add Opportunities</h3>
                    <p className="text-sm text-neutral-600 mt-1">
                      AI analysis of your current portfolio has identified 3 properties with significant value-add potential through targeted renovations and amenity upgrades. Our model projects a 1.8x ROI on renovation investments for these specific properties within 24 months.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
