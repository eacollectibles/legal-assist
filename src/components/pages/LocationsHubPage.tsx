import { Link } from 'react-router-dom';
import { MapPin, ArrowRight, Shield, Phone, Search } from 'lucide-react';
import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface CityLink {
  name: string;
  slug: string;
  region: string;
}

const REGIONS: Record<string, CityLink[]> = {
  'Southwestern Ontario': [
    { name: 'London', slug: '/paralegal-london-ontario', region: 'Middlesex County' },
    { name: 'St. Thomas', slug: '/st-thomas-paralegal', region: 'Elgin County' },
    { name: 'Woodstock', slug: '/woodstock-paralegal', region: 'Oxford County' },
    { name: 'Strathroy-Chatham', slug: '/strathroy-chatham-paralegal', region: 'Middlesex County' },
    { name: 'Ingersoll', slug: '/ingersoll-paralegal', region: 'Oxford County' },
    { name: 'Tillsonburg', slug: '/tillsonburg-paralegal', region: 'Oxford County' },
    { name: 'Aylmer', slug: '/aylmer-paralegal', region: 'Elgin County' },
    { name: 'Norwich', slug: '/locations/norwich', region: 'Oxford County' },
    { name: 'Zorra', slug: '/locations/zorra', region: 'Oxford County' },
    { name: 'Stratford', slug: '/locations/stratford', region: 'Perth County' },
    { name: 'St. Marys', slug: '/locations/st-marys', region: 'Perth County' },
    { name: 'North Perth', slug: '/locations/north-perth', region: 'Perth County' },
  ],
  'Greater Toronto Area': [
    { name: 'Toronto', slug: '/locations/toronto', region: 'Toronto' },
    { name: 'Mississauga', slug: '/locations/mississauga', region: 'Peel Region' },
    { name: 'Brampton', slug: '/locations/brampton', region: 'Peel Region' },
    { name: 'Markham', slug: '/locations/markham', region: 'York Region' },
    { name: 'Vaughan', slug: '/locations/vaughan', region: 'York Region' },
    { name: 'Richmond Hill', slug: '/locations/richmond-hill', region: 'York Region' },
    { name: 'Oakville', slug: '/locations/oakville', region: 'Halton Region' },
    { name: 'Burlington', slug: '/locations/burlington', region: 'Halton Region' },
    { name: 'Milton', slug: '/locations/milton', region: 'Halton Region' },
    { name: 'Halton Hills', slug: '/locations/halton-hills', region: 'Halton Region' },
    { name: 'Newmarket', slug: '/locations/newmarket', region: 'York Region' },
    { name: 'Aurora', slug: '/locations/aurora', region: 'York Region' },
    { name: 'Stouffville', slug: '/locations/stouffville', region: 'York Region' },
    { name: 'East Gwillimbury', slug: '/locations/east-gwillimbury', region: 'York Region' },
    { name: 'Georgina', slug: '/locations/georgina', region: 'York Region' },
    { name: 'King', slug: '/locations/king', region: 'York Region' },
    { name: 'Caledon', slug: '/locations/caledon', region: 'Peel Region' },
    { name: 'Ajax', slug: '/locations/ajax', region: 'Durham Region' },
    { name: 'Pickering', slug: '/locations/pickering', region: 'Durham Region' },
    { name: 'Oshawa', slug: '/locations/oshawa', region: 'Durham Region' },
    { name: 'Whitby', slug: '/locations/whitby', region: 'Durham Region' },
    { name: 'Clarington', slug: '/locations/clarington', region: 'Durham Region' },
    { name: 'Uxbridge', slug: '/locations/uxbridge', region: 'Durham Region' },
    { name: 'Scugog', slug: '/locations/scugog', region: 'Durham Region' },
  ],
  'Waterloo & Wellington': [
    { name: 'Kitchener', slug: '/locations/kitchener', region: 'Waterloo Region' },
    { name: 'Waterloo', slug: '/locations/waterloo', region: 'Waterloo Region' },
    { name: 'Cambridge', slug: '/locations/cambridge', region: 'Waterloo Region' },
    { name: 'Guelph', slug: '/locations/guelph', region: 'Wellington County' },
    { name: 'Woolwich', slug: '/locations/woolwich', region: 'Waterloo Region' },
    { name: 'Wilmot', slug: '/locations/wilmot', region: 'Waterloo Region' },
    { name: 'North Dumfries', slug: '/locations/north-dumfries', region: 'Waterloo Region' },
    { name: 'Wellesley', slug: '/locations/wellesley', region: 'Waterloo Region' },
    { name: 'Centre Wellington', slug: '/locations/centre-wellington', region: 'Wellington County' },
    { name: 'Fergus-Elora', slug: '/locations/fergus-elora', region: 'Wellington County' },
    { name: 'Mapleton', slug: '/locations/mapleton', region: 'Wellington County' },
    { name: 'Erin', slug: '/locations/erin', region: 'Wellington County' },
  ],
  'Hamilton & Niagara': [
    { name: 'Hamilton', slug: '/locations/hamilton', region: 'Hamilton' },
    { name: 'St. Catharines', slug: '/locations/st-catharines', region: 'Niagara Region' },
    { name: 'Niagara Falls', slug: '/locations/niagara-falls', region: 'Niagara Region' },
    { name: 'Welland', slug: '/locations/welland', region: 'Niagara Region' },
    { name: 'Grimsby', slug: '/locations/grimsby', region: 'Niagara Region' },
    { name: 'Thorold', slug: '/locations/thorold', region: 'Niagara Region' },
    { name: 'Fort Erie', slug: '/locations/fort-erie', region: 'Niagara Region' },
    { name: 'Port Colborne', slug: '/locations/port-colborne', region: 'Niagara Region' },
    { name: 'Niagara-on-the-Lake', slug: '/locations/niagara-on-the-lake', region: 'Niagara Region' },
    { name: 'Lincoln', slug: '/locations/lincoln', region: 'Niagara Region' },
    { name: 'Pelham', slug: '/locations/pelham', region: 'Niagara Region' },
    { name: 'West Lincoln', slug: '/locations/west-lincoln', region: 'Niagara Region' },
    { name: 'Brantford', slug: '/locations/brantford', region: 'Brant County' },
    { name: 'Brant', slug: '/locations/brant', region: 'Brant County' },
    { name: 'Haldimand County', slug: '/locations/haldimand-county', region: 'Haldimand County' },
    { name: 'Norfolk County', slug: '/locations/norfolk-county', region: 'Norfolk County' },
  ],
  'Simcoe & Muskoka': [
    { name: 'Barrie', slug: '/locations/barrie', region: 'Simcoe County' },
    { name: 'Orillia', slug: '/locations/orillia', region: 'Simcoe County' },
    { name: 'Collingwood', slug: '/locations/collingwood', region: 'Simcoe County' },
    { name: 'Midland', slug: '/locations/midland', region: 'Simcoe County' },
    { name: 'Wasaga Beach', slug: '/locations/wasaga-beach', region: 'Simcoe County' },
    { name: 'Alliston', slug: '/locations/alliston', region: 'Simcoe County' },
    { name: 'Bradford West Gwillimbury', slug: '/locations/bradford-west-gwillimbury', region: 'Simcoe County' },
    { name: 'Innisfil', slug: '/locations/innisfil', region: 'Simcoe County' },
    { name: 'New Tecumseth', slug: '/locations/new-tecumseth', region: 'Simcoe County' },
    { name: 'Penetanguishene', slug: '/locations/penetanguishene', region: 'Simcoe County' },
    { name: 'Oro-Medonte', slug: '/locations/oro-medonte', region: 'Simcoe County' },
    { name: 'Clearview', slug: '/locations/clearview', region: 'Simcoe County' },
    { name: 'Severn', slug: '/locations/severn', region: 'Simcoe County' },
    { name: 'Bracebridge', slug: '/locations/bracebridge', region: 'Muskoka' },
    { name: 'Gravenhurst', slug: '/locations/gravenhurst', region: 'Muskoka' },
    { name: 'Huntsville', slug: '/locations/huntsville', region: 'Muskoka' },
  ],
  'Dufferin, Grey & Bruce': [
    { name: 'Orangeville', slug: '/locations/orangeville', region: 'Dufferin County' },
    { name: 'Shelburne', slug: '/locations/shelburne', region: 'Dufferin County' },
    { name: 'Mono', slug: '/locations/mono', region: 'Dufferin County' },
    { name: 'Owen Sound', slug: '/locations/owen-sound', region: 'Grey County' },
    { name: 'The Blue Mountains', slug: '/locations/blue-mountains', region: 'Grey County' },
    { name: 'Meaford', slug: '/locations/meaford', region: 'Grey County' },
    { name: 'Hanover', slug: '/locations/hanover', region: 'Grey County' },
    { name: 'West Grey', slug: '/locations/west-grey', region: 'Grey County' },
    { name: 'Kincardine', slug: '/locations/kincardine', region: 'Bruce County' },
    { name: 'Saugeen Shores', slug: '/locations/saugeen-shores', region: 'Bruce County' },
    { name: 'South Bruce Peninsula', slug: '/locations/south-bruce-peninsula', region: 'Bruce County' },
    { name: 'Brockton', slug: '/locations/brockton', region: 'Bruce County' },
    { name: 'Huron County', slug: '/locations/huron-county', region: 'Huron County' },
    { name: 'Goderich', slug: '/locations/goderich', region: 'Huron County' },
    { name: 'South Huron', slug: '/locations/south-huron', region: 'Huron County' },
  ],
  'Windsor & Essex': [
    { name: 'Windsor', slug: '/locations/windsor', region: 'Essex County' },
    { name: 'Leamington', slug: '/locations/leamington', region: 'Essex County' },
    { name: 'Amherstburg', slug: '/locations/amherstburg', region: 'Essex County' },
    { name: 'Essex', slug: '/locations/essex', region: 'Essex County' },
    { name: 'Kingsville', slug: '/locations/kingsville', region: 'Essex County' },
    { name: 'LaSalle', slug: '/locations/lasalle', region: 'Essex County' },
    { name: 'Lakeshore', slug: '/locations/lakeshore', region: 'Essex County' },
    { name: 'Tecumseh', slug: '/locations/tecumseh', region: 'Essex County' },
    { name: 'Chatham-Kent', slug: '/locations/chatham-kent', region: 'Chatham-Kent' },
    { name: 'Sarnia', slug: '/locations/sarnia', region: 'Lambton County' },
    { name: 'Petrolia', slug: '/locations/petrolia', region: 'Lambton County' },
    { name: 'Plympton-Wyoming', slug: '/locations/plympton-wyoming', region: 'Lambton County' },
  ],
  'Eastern Ontario': [
    { name: 'Ottawa', slug: '/locations/ottawa', region: 'Ottawa' },
    { name: 'Kingston', slug: '/locations/kingston', region: 'Frontenac County' },
    { name: 'Belleville', slug: '/locations/belleville', region: 'Hastings County' },
    { name: 'Peterborough', slug: '/locations/peterborough', region: 'Peterborough County' },
    { name: 'Cornwall', slug: '/locations/cornwall', region: 'SDG Counties' },
    { name: 'Brockville', slug: '/locations/brockville', region: 'Leeds and Grenville' },
    { name: 'Cobourg', slug: '/locations/cobourg', region: 'Northumberland County' },
    { name: 'Kawartha Lakes', slug: '/locations/kawartha-lakes', region: 'Kawartha Lakes' },
    { name: 'Quinte West', slug: '/locations/quinte-west', region: 'Hastings County' },
    { name: 'Prince Edward County', slug: '/locations/prince-edward-county', region: 'PEC' },
    { name: 'Napanee', slug: '/locations/napanee', region: 'Lennox and Addington' },
    { name: 'Loyalist', slug: '/locations/loyalist', region: 'Lennox and Addington' },
    { name: 'Picton', slug: '/locations/picton', region: 'Prince Edward County' },
    { name: 'Gananoque', slug: '/locations/gananoque', region: 'Leeds and Grenville' },
    { name: 'Prescott', slug: '/locations/prescott', region: 'Leeds and Grenville' },
    { name: 'Kemptville', slug: '/locations/kemptville', region: 'Leeds and Grenville' },
    { name: 'Smiths Falls', slug: '/locations/smiths-falls', region: 'Lanark County' },
    { name: 'Perth', slug: '/locations/perth', region: 'Lanark County' },
    { name: 'Carleton Place', slug: '/locations/carleton-place', region: 'Lanark County' },
    { name: 'Mississippi Mills', slug: '/locations/mississippi-mills', region: 'Lanark County' },
    { name: 'Brighton', slug: '/locations/brighton', region: 'Northumberland County' },
    { name: 'Port Hope', slug: '/locations/port-hope', region: 'Northumberland County' },
    { name: 'Trent Hills', slug: '/locations/trent-hills', region: 'Northumberland County' },
    { name: 'Clarence-Rockland', slug: '/locations/clarence-rockland', region: 'Prescott-Russell' },
    { name: 'Hawkesbury', slug: '/locations/hawkesbury', region: 'Prescott-Russell' },
    { name: 'Russell', slug: '/locations/russell', region: 'Prescott-Russell' },
    { name: 'South Stormont', slug: '/locations/south-stormont', region: 'SDG Counties' },
    { name: 'South Dundas', slug: '/locations/south-dundas', region: 'SDG Counties' },
    { name: 'North Glengarry', slug: '/locations/north-glengarry', region: 'SDG Counties' },
    { name: 'South Glengarry', slug: '/locations/south-glengarry', region: 'SDG Counties' },
  ],
  'Renfrew Valley & Upper Ottawa': [
    { name: 'Pembroke', slug: '/locations/pembroke', region: 'Renfrew County' },
    { name: 'Petawawa', slug: '/locations/petawawa', region: 'Renfrew County' },
    { name: 'Arnprior', slug: '/locations/arnprior', region: 'Renfrew County' },
    { name: 'Renfrew', slug: '/locations/renfrew', region: 'Renfrew County' },
    { name: 'Deep River', slug: '/locations/deep-river', region: 'Renfrew County' },
    { name: 'Bancroft', slug: '/locations/bancroft', region: 'Hastings Highlands' },
  ],
  'Northern Ontario': [
    { name: 'Sudbury', slug: '/locations/sudbury', region: 'Greater Sudbury' },
    { name: 'Thunder Bay', slug: '/locations/thunder-bay', region: 'Thunder Bay District' },
    { name: 'Sault Ste. Marie', slug: '/locations/sault-ste-marie', region: 'Algoma District' },
    { name: 'North Bay', slug: '/locations/north-bay', region: 'Nipissing District' },
    { name: 'Timmins', slug: '/locations/timmins', region: 'Cochrane District' },
    { name: 'Kenora', slug: '/locations/kenora', region: 'Kenora District' },
    { name: 'Dryden', slug: '/locations/dryden', region: 'Kenora District' },
    { name: 'Sioux Lookout', slug: '/locations/sioux-lookout', region: 'Kenora District' },
    { name: 'Fort Frances', slug: '/locations/fort-frances', region: 'Rainy River District' },
    { name: 'Atikokan', slug: '/locations/atikokan', region: 'Rainy River District' },
    { name: 'Parry Sound', slug: '/locations/parry-sound', region: 'Parry Sound District' },
    { name: 'Elliot Lake', slug: '/locations/elliot-lake', region: 'Algoma District' },
    { name: 'Blind River', slug: '/locations/blind-river', region: 'Algoma District' },
    { name: 'Espanola', slug: '/locations/espanola', region: 'Sudbury District' },
    { name: 'Temiskaming Shores', slug: '/locations/temiskaming-shores', region: 'Timiskaming' },
    { name: 'Kirkland Lake', slug: '/locations/kirkland-lake', region: 'Timiskaming' },
    { name: 'Cochrane', slug: '/locations/cochrane', region: 'Cochrane District' },
    { name: 'Hearst', slug: '/locations/hearst', region: 'Cochrane District' },
    { name: 'Kapuskasing', slug: '/locations/kapuskasing', region: 'Cochrane District' },
    { name: 'Marathon', slug: '/locations/marathon', region: 'Thunder Bay District' },
  ],
};

export default function LocationsHubPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const totalCities = Object.values(REGIONS).reduce((sum, cities) => sum + cities.length, 0);

  const filteredRegions = searchTerm
    ? Object.entries(REGIONS).reduce((acc, [region, cities]) => {
        const filtered = cities.filter(
          c => c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
               c.region.toLowerCase().includes(searchTerm.toLowerCase())
        );
        if (filtered.length > 0) acc[region] = filtered;
        return acc;
      }, {} as Record<string, CityLink[]>)
    : REGIONS;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-pastelbeige/20 py-16 md:py-24">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <div className="max-w-4xl">
            <div className="flex items-center gap-2 text-primary mb-4">
              <MapPin className="w-5 h-5" />
              <span className="font-paragraph text-sm font-medium">Province-Wide Coverage</span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Ontario Paralegal Services
            </h1>
            <p className="font-paragraph text-lg md:text-xl text-foreground/70 mb-8 max-w-3xl">
              Licensed paralegal representation across {totalCities}+ Ontario communities. From Windsor to Ottawa, Thunder Bay to Niagara Falls, Legal Assist provides affordable legal services wherever you are in Ontario.
            </p>
            <div className="relative max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/40" />
              <input
                type="text"
                placeholder="Search your city or region..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-lg border border-gray-200 font-paragraph text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Regions Grid */}
      <section className="py-16 md:py-20">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          {Object.entries(filteredRegions).map(([regionName, cities]) => (
            <div key={regionName} className="mb-12">
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-6 pb-3 border-b border-gray-200">
                {regionName}
              </h2>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {cities.map(city => (
                  <Link
                    key={city.slug}
                    to={`/locations/${city.slug}`}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-primary/5 transition-colors group"
                  >
                    <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
                    <div>
                      <span className="font-paragraph font-medium text-foreground group-hover:text-primary transition-colors">
                        {city.name}
                      </span>
                      <span className="block font-paragraph text-xs text-foreground/50">
                        {city.region}
                      </span>
                    </div>
                    <ArrowRight className="w-3 h-3 text-primary opacity-0 group-hover:opacity-100 transition-opacity ml-auto" />
                  </Link>
                ))}
              </div>
            </div>
          ))}

          {Object.keys(filteredRegions).length === 0 && (
            <div className="text-center py-12">
              <p className="font-paragraph text-foreground/60 text-lg">No locations match "{searchTerm}". Try a different search term.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-primary text-primary-foreground">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8 text-center">
          <Phone className="w-12 h-12 mx-auto mb-4 opacity-90" />
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">Don't See Your City?</h2>
          <p className="font-paragraph text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            We serve all of Ontario through virtual consultations and court appearances. Contact us for a free consultation regardless of where you are.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="inline-flex items-center justify-center gap-2 bg-white text-primary px-8 py-4 rounded-lg font-paragraph font-semibold hover:bg-gray-100 transition-colors">
              Book Free Consultation <ArrowRight className="w-5 h-5" />
            </Link>
            <a href="tel:2262725153" className="inline-flex items-center justify-center gap-2 border-2 border-white text-white px-8 py-4 rounded-lg font-paragraph font-semibold hover:bg-white/10 transition-colors">
              Call 226-272-5153
            </a>
          </div>
        </div>
      </section>

      {/* LSO Badge */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8 text-center">
          <p className="font-paragraph text-sm text-foreground/60">
            <Shield className="w-4 h-4 inline mr-1" />
            Licensed by the Law Society of Ontario | Serving All of Ontario
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
