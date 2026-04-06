-- ============================================================
-- Migration: 2026-04-06d -- Expanded Race Catalog
-- Seeds 250+ real worldwide endurance events across running,
-- triathlon, cycling, HYROX, and open-water swimming.
-- Idempotent via ON CONFLICT ... DO UPDATE SET.
-- ============================================================

INSERT INTO public.race_catalog
  (series, event_code, event_name, short_name, city, country, country_code,
   distance_km, distance_label, iconic_level, primary_color, secondary_color,
   logo_emoji, sport_type)
VALUES

-- ============================================================
-- WORLD MARATHON MAJORS  (series='marathon_majors', iconic_level=5)
-- ============================================================
('marathon_majors','tokyo','Tokyo Marathon','Tokyo','Tokyo','Japan','JP',42.195,'marathon',5,'#BC002D','#FFFFFF','🏅','run'),
('marathon_majors','boston','Boston Marathon','Boston','Boston','USA','US',42.195,'marathon',5,'#003DA5','#FFCD00','🏅','run'),
('marathon_majors','london','London Marathon','London','London','UK','GB',42.195,'marathon',5,'#FF671F','#012169','🏅','run'),
('marathon_majors','berlin','Berlin Marathon','Berlin','Berlin','Germany','DE',42.195,'marathon',5,'#E5007D','#FFCC00','🏅','run'),
('marathon_majors','chicago','Chicago Marathon','Chicago','Chicago','USA','US',42.195,'marathon',5,'#C8102E','#000000','🏅','run'),
('marathon_majors','nyc','New York City Marathon','NYC','New York','USA','US',42.195,'marathon',5,'#FF6319','#0039A6','🏅','run'),

-- ============================================================
-- ICONIC MARATHONS -- Europe  (series='iconic_marathon')
-- ============================================================
('iconic_marathon','paris','Paris Marathon','Paris','Paris','France','FR',42.195,'marathon',4,'#002395','#ED2939','🏅','run'),
('iconic_marathon','rome','Rome Marathon','Rome','Rome','Italy','IT',42.195,'marathon',4,'#009246','#CE2B37','🏅','run'),
('iconic_marathon','athens','Athens Authentic Marathon','Athens','Athens','Greece','GR',42.195,'marathon',4,'#005EB8','#FFFFFF','🏅','run'),
('iconic_marathon','lisbon','Lisbon Marathon','Lisbon','Lisbon','Portugal','PT',42.195,'marathon',3,'#006847','#FF0000','🏅','run'),
('iconic_marathon','madrid','Rock''n''Roll Madrid Marathon','Madrid','Madrid','Spain','ES',42.195,'marathon',3,'#AA151B','#F1BF00','🏅','run'),
('iconic_marathon','prague','Prague Marathon','Prague','Prague','Czech Republic','CZ',42.195,'marathon',4,'#11457E','#D7141A','🏅','run'),
('iconic_marathon','warsaw','Warsaw Marathon','Warsaw','Warsaw','Poland','PL',42.195,'marathon',3,'#DC143C','#FFFFFF','🏅','run'),
('iconic_marathon','edinburgh','Edinburgh Marathon','Edinburgh','Edinburgh','UK','GB',42.195,'marathon',3,'#003DA5','#FFFFFF','🏅','run'),
('iconic_marathon','rotterdam','Rotterdam Marathon','Rotterdam','Rotterdam','Netherlands','NL',42.195,'marathon',4,'#FF6F00','#000000','🏅','run'),
('iconic_marathon','seville','Seville Marathon','Seville','Seville','Spain','ES',42.195,'marathon',3,'#F1BF00','#AA151B','🏅','run'),
('iconic_marathon','valencia','Valencia Marathon','Valencia','Valencia','Spain','ES',42.195,'marathon',4,'#FF6F00','#003DA5','🏅','run'),
('iconic_marathon','malaga','Malaga Marathon','Malaga','Malaga','Spain','ES',42.195,'marathon',3,'#003DA5','#F1BF00','🏅','run'),
('iconic_marathon','nice_m','Nice-Cannes Marathon','Nice-Cannes','Nice','France','FR',42.195,'marathon',3,'#002395','#87CEEB','🏅','run'),
('iconic_marathon','florence','Florence Marathon','Florence','Florence','Italy','IT',42.195,'marathon',3,'#800020','#FFD700','🏅','run'),
('iconic_marathon','venice','Venice Marathon','Venice','Venice','Italy','IT',42.195,'marathon',3,'#009246','#FFD700','🏅','run'),
('iconic_marathon','milan','Milan Marathon','Milan','Milan','Italy','IT',42.195,'marathon',3,'#009246','#CE2B37','🏅','run'),
('iconic_marathon','bruges','Bruges Marathon','Bruges','Bruges','Belgium','BE',42.195,'marathon',3,'#000000','#FFD700','🏅','run'),
('iconic_marathon','tallinn_m','Tallinn Marathon','Tallinn','Tallinn','Estonia','EE',42.195,'marathon',3,'#0072CE','#000000','🏅','run'),
('iconic_marathon','reykjavik','Reykjavik Marathon','Reykjavik','Reykjavik','Iceland','IS',42.195,'marathon',3,'#003897','#DC1E35','🏅','run'),
('iconic_marathon','oslo','Oslo Marathon','Oslo','Oslo','Norway','NO',42.195,'marathon',3,'#BA0C2F','#00205B','🏅','run'),
('iconic_marathon','helsinki','Helsinki Marathon','Helsinki','Helsinki','Finland','FI',42.195,'marathon',3,'#003580','#FFFFFF','🏅','run'),
('iconic_marathon','gothenburg_m','Gothenburg Marathon','Gothenburg','Gothenburg','Sweden','SE',42.195,'marathon',3,'#006AA7','#FECC02','🏅','run'),
('iconic_marathon','enschede','Enschede Marathon','Enschede','Enschede','Netherlands','NL',42.195,'marathon',3,'#FF6F00','#FFFFFF','🏅','run'),
('iconic_marathon','lausanne','Lausanne Marathon','Lausanne','Lausanne','Switzerland','CH',42.195,'marathon',3,'#DA291C','#FFFFFF','🏅','run'),
('iconic_marathon','geneva','Geneva Marathon','Geneva','Geneva','Switzerland','CH',42.195,'marathon',3,'#DA291C','#FFFFFF','🏅','run'),
('iconic_marathon','salzburg','Salzburg Marathon','Salzburg','Salzburg','Austria','AT',42.195,'marathon',3,'#ED2939','#FFFFFF','🏅','run'),
('iconic_marathon','graz','Graz Marathon','Graz','Graz','Austria','AT',42.195,'marathon',3,'#ED2939','#FFFFFF','🏅','run'),
('iconic_marathon','linz','Linz Marathon','Linz','Linz','Austria','AT',42.195,'marathon',3,'#ED2939','#FFFFFF','🏅','run'),
('iconic_marathon','luxembourg_m','Luxembourg Marathon','Luxembourg','Luxembourg','Luxembourg','LU',42.195,'marathon',3,'#00A2E0','#ED2939','🏅','run'),
('iconic_marathon','budapest','Budapest Marathon','Budapest','Budapest','Hungary','HU',42.195,'marathon',3,'#477050','#CE2939','🏅','run'),
('iconic_marathon','barcelona_m','Barcelona Marathon','Barcelona','Barcelona','Spain','ES',42.195,'marathon',4,'#FFCD00','#E30613','🏅','run'),
('iconic_marathon','amsterdam','Amsterdam Marathon','Amsterdam','Amsterdam','Netherlands','NL',42.195,'marathon',4,'#FF6F00','#000000','🏅','run'),
('iconic_marathon','stockholm_m','Stockholm Marathon','Stockholm','Stockholm','Sweden','SE',42.195,'marathon',3,'#006AA7','#FECC02','🏅','run'),
('iconic_marathon','copenhagen','Copenhagen Marathon','Copenhagen','Copenhagen','Denmark','DK',42.195,'marathon',3,'#C8102E','#FFFFFF','🏅','run'),
('iconic_marathon','zurich','Zurich Marathon','Zurich','Zurich','Switzerland','CH',42.195,'marathon',3,'#DA291C','#FFFFFF','🏅','run'),
('iconic_marathon','vienna','Vienna City Marathon','Wien','Wien','Austria','AT',42.195,'marathon',4,'#ED2939','#FFFFFF','🏅','run'),
('iconic_marathon','istanbul','Istanbul Marathon','Istanbul','Istanbul','Turkey','TR',42.195,'marathon',3,'#E30A17','#FFFFFF','🏅','run'),
('iconic_marathon','frankfurt','Frankfurt Marathon','Frankfurt','Frankfurt','Germany','DE',42.195,'marathon',4,'#E30613','#000000','🏅','run'),
('iconic_marathon','hamburg','Haspa Marathon Hamburg','Hamburg','Hamburg','Germany','DE',42.195,'marathon',4,'#009EE0','#FFFFFF','🏅','run'),
('iconic_marathon','koeln','Koeln Marathon','Koeln','Koeln','Germany','DE',42.195,'marathon',3,'#D2001C','#FFFFFF','🏅','run'),
('iconic_marathon','duesseldorf','METRO Marathon Duesseldorf','Duesseldorf','Duesseldorf','Germany','DE',42.195,'marathon',3,'#009EE0','#FFFFFF','🏅','run'),
('iconic_marathon','muenchen','Muenchen Marathon','Muenchen','Muenchen','Germany','DE',42.195,'marathon',3,'#009EE0','#FFD700','🏅','run'),
('iconic_marathon','hannover','HAJ Hannover Marathon','Hannover','Hannover','Germany','DE',42.195,'marathon',3,'#E30613','#FFFFFF','🏅','run'),

-- ── Iconic Marathons -- Americas ──
('iconic_marathon','la','LA Marathon','LA','Los Angeles','USA','US',42.195,'marathon',4,'#FF6319','#000000','🏅','run'),
('iconic_marathon','houston','Houston Marathon','Houston','Houston','USA','US',42.195,'marathon',3,'#003DA5','#FFFFFF','🏅','run'),
('iconic_marathon','marine_corps','Marine Corps Marathon','MCM','Washington DC','USA','US',42.195,'marathon',4,'#CC0000','#FFD700','🏅','run'),
('iconic_marathon','honolulu','Honolulu Marathon','Honolulu','Honolulu','USA','US',42.195,'marathon',3,'#009CDE','#FFD700','🏅','run'),
('iconic_marathon','toronto','Toronto Waterfront Marathon','Toronto','Toronto','Canada','CA',42.195,'marathon',3,'#FF0000','#FFFFFF','🏅','run'),
('iconic_marathon','ottawa','Ottawa Marathon','Ottawa','Ottawa','Canada','CA',42.195,'marathon',3,'#FF0000','#FFFFFF','🏅','run'),
('iconic_marathon','buenos_aires','Buenos Aires Marathon','Buenos Aires','Buenos Aires','Argentina','AR',42.195,'marathon',3,'#75AADB','#FFFFFF','🏅','run'),
('iconic_marathon','santiago','Santiago Marathon','Santiago','Santiago','Chile','CL',42.195,'marathon',3,'#D52B1E','#0039A6','🏅','run'),
('iconic_marathon','mexico_city','Mexico City Marathon','CDMX','Mexico City','Mexico','MX',42.195,'marathon',3,'#006847','#CE1126','🏅','run'),
('iconic_marathon','medellin','Medellin Marathon','Medellin','Medellin','Colombia','CO',42.195,'marathon',3,'#FCD116','#003DA5','🏅','run'),
('iconic_marathon','sao_paulo','Sao Paulo Marathon','Sao Paulo','Sao Paulo','Brazil','BR',42.195,'marathon',3,'#009B3A','#FFDF00','🏅','run'),
('iconic_marathon','rio','Rio Marathon','Rio','Rio de Janeiro','Brazil','BR',42.195,'marathon',3,'#009B3A','#FFDF00','🏅','run'),
('iconic_marathon','philadelphia','Philadelphia Marathon','Philly','Philadelphia','USA','US',42.195,'marathon',3,'#003DA5','#FFD700','🏅','run'),
('iconic_marathon','san_francisco','San Francisco Marathon','SF','San Francisco','USA','US',42.195,'marathon',3,'#FF6319','#FFD700','🏅','run'),
('iconic_marathon','twin_cities','Twin Cities Marathon','Twin Cities','Minneapolis','USA','US',42.195,'marathon',3,'#003DA5','#FFD700','🏅','run'),
('iconic_marathon','detroit','Detroit Free Press Marathon','Detroit','Detroit','USA','US',42.195,'marathon',3,'#0076CE','#FFFFFF','🏅','run'),

-- ── Iconic Marathons -- Asia / Oceania ──
('iconic_marathon','shanghai','Shanghai Marathon','Shanghai','Shanghai','China','CN',42.195,'marathon',4,'#EE1C25','#FFDE00','🏅','run'),
('iconic_marathon','beijing','Beijing Marathon','Beijing','Beijing','China','CN',42.195,'marathon',4,'#EE1C25','#FFDE00','🏅','run'),
('iconic_marathon','taipei','Taipei Marathon','Taipei','Taipei','Taiwan','TW',42.195,'marathon',3,'#FE0000','#000095','🏅','run'),
('iconic_marathon','seoul','Seoul Marathon','Seoul','Seoul','South Korea','KR',42.195,'marathon',4,'#003DA5','#CD2E3A','🏅','run'),
('iconic_marathon','osaka','Osaka Marathon','Osaka','Osaka','Japan','JP',42.195,'marathon',3,'#BC002D','#FFFFFF','🏅','run'),
('iconic_marathon','singapore_m','Singapore Marathon','Singapore','Singapore','Singapore','SG',42.195,'marathon',3,'#EF3340','#FFFFFF','🏅','run'),
('iconic_marathon','kuala_lumpur','Kuala Lumpur Marathon','KL','Kuala Lumpur','Malaysia','MY',42.195,'marathon',3,'#010066','#CC0000','🏅','run'),
('iconic_marathon','hong_kong','Hong Kong Marathon','HK','Hong Kong','Hong Kong','HK',42.195,'marathon',3,'#DE2910','#FFD700','🏅','run'),
('iconic_marathon','mumbai','Tata Mumbai Marathon','Mumbai','Mumbai','India','IN',42.195,'marathon',4,'#FF9933','#138808','🏅','run'),
('iconic_marathon','delhi','Delhi Marathon','Delhi','New Delhi','India','IN',42.195,'marathon',3,'#FF9933','#138808','🏅','run'),
('iconic_marathon','melbourne','Melbourne Marathon','Melbourne','Melbourne','Australia','AU',42.195,'marathon',3,'#00843D','#FFD700','🏅','run'),
('iconic_marathon','sydney','Sydney Marathon','Sydney','Sydney','Australia','AU',42.195,'marathon',4,'#00843D','#FFD700','🏅','run'),
('iconic_marathon','auckland','Auckland Marathon','Auckland','Auckland','New Zealand','NZ',42.195,'marathon',3,'#00247D','#CC142B','🏅','run'),
('iconic_marathon','gold_coast','Gold Coast Marathon','Gold Coast','Gold Coast','Australia','AU',42.195,'marathon',3,'#00843D','#FFD700','🏅','run'),
('iconic_marathon','nagoya','Nagoya Women''s Marathon','Nagoya','Nagoya','Japan','JP',42.195,'marathon',4,'#E60072','#FFFFFF','🏅','run'),
('iconic_marathon','bangkok','Bangkok Marathon','Bangkok','Bangkok','Thailand','TH',42.195,'marathon',3,'#A51931','#F4F5F8','🏅','run'),

-- ── Iconic Marathons -- Africa / Middle East ──
('iconic_marathon','dubai','Dubai Marathon','Dubai','Dubai','UAE','AE',42.195,'marathon',4,'#00732F','#FFFFFF','🏅','run'),
('iconic_marathon','abu_dhabi','Abu Dhabi Marathon','Abu Dhabi','Abu Dhabi','UAE','AE',42.195,'marathon',3,'#00732F','#FFFFFF','🏅','run'),
('iconic_marathon','cape_town','Cape Town Marathon','Cape Town','Cape Town','South Africa','ZA',42.195,'marathon',4,'#007749','#FFB81C','🏅','run'),
('iconic_marathon','marrakech','Marrakech Marathon','Marrakech','Marrakech','Morocco','MA',42.195,'marathon',3,'#C1272D','#006233','🏅','run'),
('iconic_marathon','nairobi','Nairobi Marathon','Nairobi','Nairobi','Kenya','KE',42.195,'marathon',3,'#006600','#BB0000','🏅','run'),
('iconic_marathon','beirut','Beirut Marathon','Beirut','Beirut','Lebanon','LB',42.195,'marathon',3,'#EE161F','#FFFFFF','🏅','run'),
('iconic_marathon','casablanca','Casablanca Marathon','Casablanca','Casablanca','Morocco','MA',42.195,'marathon',3,'#C1272D','#006233','🏅','run'),
('iconic_marathon','lagos','Lagos City Marathon','Lagos','Lagos','Nigeria','NG',42.195,'marathon',3,'#008751','#FFFFFF','🏅','run'),

-- ============================================================
-- HALF MARATHONS  (series='iconic_marathon', distance_label='half_marathon')
-- ============================================================
('iconic_marathon','gothenburg_hm','Gothenburg Half Marathon','Gothenburg HM','Gothenburg','Sweden','SE',21.0975,'half_marathon',4,'#006AA7','#FECC02','🏅','run'),
('iconic_marathon','great_north','Great North Run','Great North Run','Newcastle','UK','GB',21.0975,'half_marathon',4,'#003DA5','#FFFFFF','🏅','run'),
('iconic_marathon','nyc_hm','NYC Half Marathon','NYC Half','New York','USA','US',21.0975,'half_marathon',4,'#FF6319','#0039A6','🏅','run'),
('iconic_marathon','berlin_hm','Berlin Half Marathon','Berlin HM','Berlin','Germany','DE',21.0975,'half_marathon',3,'#E5007D','#FFCC00','🏅','run'),
('iconic_marathon','lisbon_hm','Lisbon Half Marathon','Lisbon HM','Lisbon','Portugal','PT',21.0975,'half_marathon',4,'#006847','#FF0000','🏅','run'),
('iconic_marathon','prague_hm','Prague Half Marathon','Prague HM','Prague','Czech Republic','CZ',21.0975,'half_marathon',4,'#11457E','#D7141A','🏅','run'),
('iconic_marathon','copenhagen_hm','Copenhagen Half Marathon','CPH HM','Copenhagen','Denmark','DK',21.0975,'half_marathon',4,'#C8102E','#FFFFFF','🏅','run'),
('iconic_marathon','valencia_hm','Valencia Half Marathon','Valencia HM','Valencia','Spain','ES',21.0975,'half_marathon',4,'#FF6F00','#003DA5','🏅','run'),
('iconic_marathon','barcelona_hm','Barcelona Half Marathon','Barcelona HM','Barcelona','Spain','ES',21.0975,'half_marathon',3,'#FFCD00','#E30613','🏅','run'),
('iconic_marathon','delhi_hm','Delhi Half Marathon','Delhi HM','New Delhi','India','IN',21.0975,'half_marathon',4,'#FF9933','#138808','🏅','run'),
('iconic_marathon','istanbul_hm','Istanbul Half Marathon','Istanbul HM','Istanbul','Turkey','TR',21.0975,'half_marathon',3,'#E30A17','#FFFFFF','🏅','run'),
('iconic_marathon','paris_hm','Paris Half Marathon','Paris HM','Paris','France','FR',21.0975,'half_marathon',3,'#002395','#ED2939','🏅','run'),
('iconic_marathon','cardiff_hm','Cardiff Half Marathon','Cardiff HM','Cardiff','UK','GB',21.0975,'half_marathon',3,'#00AB39','#FFFFFF','🏅','run'),
('iconic_marathon','madrid_hm','Madrid Half Marathon','Madrid HM','Madrid','Spain','ES',21.0975,'half_marathon',3,'#AA151B','#F1BF00','🏅','run'),
('iconic_marathon','rome_hm','Rome Half Marathon','Rome HM','Rome','Italy','IT',21.0975,'half_marathon',3,'#009246','#CE2B37','🏅','run'),

-- ============================================================
-- ULTRA MARATHONS  (series='ultra')
-- ============================================================
('ultra','utmb','UTMB','UTMB','Chamonix','France','FR',171,'ultra_171k',5,'#002395','#FFFFFF','⛰️','run'),
('ultra','western_states','Western States 100','WSER','Olympic Valley','USA','US',161,'ultra_100mi',5,'#003DA5','#FFCD00','⛰️','run'),
('ultra','comrades','Comrades Marathon','Comrades','Durban','South Africa','ZA',89,'ultra_89k',5,'#007749','#FFB81C','⛰️','run'),
('ultra','mds','Marathon des Sables','MDS','Sahara','Morocco','MA',250,'ultra_stage',5,'#C1272D','#006233','🏜️','run'),
('ultra','leadville','Leadville Trail 100','Leadville','Leadville','USA','US',161,'ultra_100mi',5,'#B22234','#FFFFFF','⛰️','run'),
('ultra','hardrock','Hardrock 100','Hardrock','Silverton','USA','US',161,'ultra_100mi',5,'#8B4513','#FFFFFF','⛰️','run'),
('ultra','badwater','Badwater 135','Badwater','Death Valley','USA','US',217,'ultra_135mi',5,'#FF4500','#000000','🔥','run'),
('ultra','uta','Ultra-Trail Australia','UTA','Katoomba','Australia','AU',100,'ultra_100k',4,'#00843D','#FFD700','⛰️','run'),
('ultra','lavaredo','Lavaredo Ultra Trail','Lavaredo','Cortina','Italy','IT',120,'ultra_120k',4,'#009246','#CE2B37','⛰️','run'),
('ultra','transgrancanaria','Transgrancanaria','TGC','Gran Canaria','Spain','ES',128,'ultra_128k',4,'#FFCD00','#E30613','⛰️','run'),
('ultra','ccc','CCC','CCC','Courmayeur','Italy','IT',101,'ultra_100k',5,'#002395','#FFFFFF','⛰️','run'),
('ultra','occ','OCC','OCC','Orsires','Switzerland','CH',55,'ultra_55k',4,'#DA291C','#FFFFFF','⛰️','run'),
('ultra','tds','TDS','TDS','Courmayeur','Italy','IT',145,'ultra_145k',5,'#002395','#FFFFFF','⛰️','run'),
('ultra','eiger','Eiger Ultra Trail','Eiger','Grindelwald','Switzerland','CH',101,'ultra_100k',4,'#DA291C','#FFFFFF','⛰️','run'),
('ultra','zugspitz','Zugspitz Ultratrail','Zugspitz','Garmisch-Partenkirchen','Germany','DE',106,'ultra_106k',4,'#000000','#FFD700','⛰️','run'),
('ultra','mozart_100','Mozart 100','Mozart 100','Salzburg','Austria','AT',100,'ultra_100k',3,'#ED2939','#FFFFFF','⛰️','run'),
('ultra','spartathlon','Spartathlon','Sparta','Athens','Greece','GR',246,'ultra_246k',5,'#005EB8','#FFFFFF','⛰️','run'),
('ultra','two_oceans','Two Oceans Ultra Marathon','Two Oceans','Cape Town','South Africa','ZA',56,'ultra_56k',4,'#007749','#FFB81C','⛰️','run'),
('ultra','tor_des_geants','Tor des Geants','TDG','Courmayeur','Italy','IT',330,'ultra_330k',5,'#009246','#FFFFFF','⛰️','run'),
('ultra','itra_reunion','Grand Raid Reunion (Diagonale des Fous)','Diagonale','Saint-Denis','Reunion','RE',165,'ultra_165k',5,'#002395','#009B3A','⛰️','run'),
('ultra','javelina_100','Javelina Jundred 100','Javelina','Fountain Hills','USA','US',161,'ultra_100mi',3,'#FF4500','#000000','⛰️','run'),
('ultra','centurion_100','Centurion Running 100','Centurion','Various','UK','GB',161,'ultra_100mi',3,'#003DA5','#FFFFFF','⛰️','run'),
('ultra','lakeland_100','Lakeland 100','Lakeland','Coniston','UK','GB',161,'ultra_100mi',4,'#2E8B57','#FFFFFF','⛰️','run'),
('ultra','penyagolosa','Penyagolosa Trails','Penyagolosa','Castellon','Spain','ES',118,'ultra_118k',3,'#FF6F00','#003DA5','⛰️','run'),
('ultra','tarawera','Tarawera Ultramarathon','Tarawera','Rotorua','New Zealand','NZ',102,'ultra_102k',3,'#00247D','#CC142B','⛰️','run'),

-- ============================================================
-- IRONMAN FULL DISTANCE  (series='ironman', distance_km=226, sport_type='tri')
-- ============================================================
('ironman','kona','Ironman World Championship Kona','Kona','Kailua-Kona','USA','US',226,'ironman',5,'#D4AF37','#003DA5','🥇','tri'),
('ironman','frankfurt_im','Ironman European Championship Frankfurt','IM Frankfurt','Frankfurt','Germany','DE',226,'ironman',4,'#E30613','#000000','🥇','tri'),
('ironman','hamburg_im','Ironman Hamburg','IM Hamburg','Hamburg','Germany','DE',226,'ironman',4,'#009EE0','#FFFFFF','🥇','tri'),
('ironman','nice','Ironman Nice','IM Nice','Nice','France','FR',226,'ironman',4,'#002395','#ED2939','🥇','tri'),
('ironman','barcelona','Ironman Barcelona','IM Barcelona','Calella','Spain','ES',226,'ironman',4,'#FFCD00','#E30613','🥇','tri'),
('ironman','lanzarote','Ironman Lanzarote','IM Lanzarote','Lanzarote','Spain','ES',226,'ironman',5,'#E30613','#FFCD00','🥇','tri'),
('ironman','tallinn_im','Ironman Tallinn','IM Tallinn','Tallinn','Estonia','EE',226,'ironman',3,'#0072CE','#000000','🥇','tri'),
('ironman','copenhagen_im','Ironman Copenhagen','IM Copenhagen','Copenhagen','Denmark','DK',226,'ironman',4,'#C8102E','#FFFFFF','🥇','tri'),
('ironman','cairns','Ironman Cairns','IM Cairns','Cairns','Australia','AU',226,'ironman',3,'#00843D','#FFD700','🥇','tri'),
('ironman','port_elizabeth','Ironman South Africa','IM South Africa','Port Elizabeth','South Africa','ZA',226,'ironman',4,'#007749','#FFB81C','🥇','tri'),
('ironman','lake_placid','Ironman Lake Placid','IM Lake Placid','Lake Placid','USA','US',226,'ironman',4,'#003DA5','#FFFFFF','🥇','tri'),
('ironman','wisconsin','Ironman Wisconsin','IM Wisconsin','Madison','USA','US',226,'ironman',3,'#C5050C','#FFFFFF','🥇','tri'),
('ironman','maryland','Ironman Maryland','IM Maryland','Cambridge','USA','US',226,'ironman',3,'#003DA5','#FFFFFF','🥇','tri'),
('ironman','texas','Ironman Texas','IM Texas','The Woodlands','USA','US',226,'ironman',3,'#BF0A30','#002868','🥇','tri'),
('ironman','florida','Ironman Florida','IM Florida','Panama City Beach','USA','US',226,'ironman',3,'#003DA5','#FF6319','🥇','tri'),
('ironman','arizona','Ironman Arizona','IM Arizona','Tempe','USA','US',226,'ironman',3,'#C41E3A','#FFD700','🥇','tri'),
('ironman','cozumel','Ironman Cozumel','IM Cozumel','Cozumel','Mexico','MX',226,'ironman',3,'#006847','#CE1126','🥇','tri'),
('ironman','new_zealand','Ironman New Zealand','IM NZ','Taupo','New Zealand','NZ',226,'ironman',4,'#00247D','#CC142B','🥇','tri'),
('ironman','western_australia','Ironman Western Australia','IM WA','Busselton','Australia','AU',226,'ironman',3,'#00843D','#FFD700','🥇','tri'),
('ironman','roth','Challenge Roth','Roth','Roth','Germany','DE',226,'ironman',5,'#FFD700','#000000','🥇','tri'),
('ironman','wales','Ironman Wales','IM Wales','Tenby','UK','GB',226,'ironman',4,'#E30613','#FFFFFF','🥇','tri'),
('ironman','bolton','Ironman UK Bolton','IM Bolton','Bolton','UK','GB',226,'ironman',3,'#003DA5','#FFFFFF','🥇','tri'),
('ironman','vitoria','Ironman Vitoria-Gasteiz','IM Vitoria','Vitoria-Gasteiz','Spain','ES',226,'ironman',3,'#AA151B','#F1BF00','🥇','tri'),
('ironman','emilia_romagna','Ironman Emilia-Romagna','IM Emilia','Cervia','Italy','IT',226,'ironman',3,'#009246','#CE2B37','🥇','tri'),

-- ============================================================
-- IRONMAN 70.3  (series='ironman_703', distance_km=113, sport_type='tri')
-- ============================================================
('ironman_703','703_worlds','Ironman 70.3 World Championship','70.3 WC','Varies','World','WW',113,'ironman_70_3',5,'#D4AF37','#003DA5','🥇','tri'),
('ironman_703','703_bahrain','Ironman 70.3 Bahrain','70.3 Bahrain','Bahrain','Bahrain','BH',113,'ironman_70_3',4,'#CE1126','#FFFFFF','🥇','tri'),
('ironman_703','703_zell_am_see','Ironman 70.3 Zell am See','70.3 Zell am See','Zell am See','Austria','AT',113,'ironman_70_3',3,'#ED2939','#FFFFFF','🥇','tri'),
('ironman_703','703_kraichgau','Ironman 70.3 Kraichgau','70.3 Kraichgau','Kraichgau','Germany','DE',113,'ironman_70_3',3,'#009EE0','#FFFFFF','🥇','tri'),
('ironman_703','703_luxembourg','Ironman 70.3 Luxembourg','70.3 Luxembourg','Remich','Luxembourg','LU',113,'ironman_70_3',3,'#00A2E0','#ED2939','🥇','tri'),
('ironman_703','703_mallorca','Ironman 70.3 Mallorca','70.3 Mallorca','Alcudia','Spain','ES',113,'ironman_70_3',3,'#FFCD00','#003DA5','🥇','tri'),
('ironman_703','703_barcelona','Ironman 70.3 Barcelona','70.3 Barcelona','Barcelona','Spain','ES',113,'ironman_70_3',3,'#FFCD00','#E30613','🥇','tri'),
('ironman_703','703_nice','Ironman 70.3 Nice','70.3 Nice','Nice','France','FR',113,'ironman_70_3',3,'#002395','#87CEEB','🥇','tri'),
('ironman_703','703_aix','Ironman 70.3 Aix-en-Provence','70.3 Aix','Aix-en-Provence','France','FR',113,'ironman_70_3',3,'#002395','#ED2939','🥇','tri'),
('ironman_703','703_cascais','Ironman 70.3 Cascais','70.3 Cascais','Cascais','Portugal','PT',113,'ironman_70_3',3,'#006847','#FF0000','🥇','tri'),
('ironman_703','703_gdynia','Ironman 70.3 Gdynia','70.3 Gdynia','Gdynia','Poland','PL',113,'ironman_70_3',3,'#DC143C','#FFFFFF','🥇','tri'),
('ironman_703','703_jonkoping','Ironman 70.3 Jonkoping','70.3 Jonkoping','Jonkoping','Sweden','SE',113,'ironman_70_3',3,'#006AA7','#FECC02','🥇','tri'),
('ironman_703','703_elsinore','Ironman 70.3 Elsinore','70.3 Elsinore','Helsingor','Denmark','DK',113,'ironman_70_3',3,'#C8102E','#FFFFFF','🥇','tri'),
('ironman_703','703_st_polten','Ironman 70.3 St. Poelten','70.3 St. Poelten','St. Poelten','Austria','AT',113,'ironman_70_3',3,'#ED2939','#FFFFFF','🥇','tri'),
('ironman_703','703_rapperswil','Ironman 70.3 Rapperswil-Jona','70.3 Rapperswil','Rapperswil-Jona','Switzerland','CH',113,'ironman_70_3',3,'#DA291C','#FFFFFF','🥇','tri'),
('ironman_703','703_vichy','Ironman 70.3 Vichy','70.3 Vichy','Vichy','France','FR',113,'ironman_70_3',3,'#002395','#ED2939','🥇','tri'),
('ironman_703','703_venice','Ironman 70.3 Venice-Jesolo','70.3 Venice','Jesolo','Italy','IT',113,'ironman_70_3',3,'#009246','#CE2B37','🥇','tri'),
('ironman_703','703_staffordshire','Ironman 70.3 Staffordshire','70.3 Staffs','Stafford','UK','GB',113,'ironman_70_3',3,'#003DA5','#FFFFFF','🥇','tri'),
('ironman_703','703_swansea','Ironman 70.3 Swansea','70.3 Swansea','Swansea','UK','GB',113,'ironman_70_3',3,'#003DA5','#FFFFFF','🥇','tri'),
('ironman_703','703_weymouth','Ironman 70.3 Weymouth','70.3 Weymouth','Weymouth','UK','GB',113,'ironman_70_3',3,'#003DA5','#FFFFFF','🥇','tri'),
('ironman_703','703_boulder','Ironman 70.3 Boulder','70.3 Boulder','Boulder','USA','US',113,'ironman_70_3',3,'#003DA5','#FFD700','🥇','tri'),
('ironman_703','703_chattanooga','Ironman 70.3 Chattanooga','70.3 Chatt','Chattanooga','USA','US',113,'ironman_70_3',3,'#003DA5','#FFFFFF','🥇','tri'),
('ironman_703','703_santa_cruz','Ironman 70.3 Santa Cruz','70.3 Santa Cruz','Santa Cruz','USA','US',113,'ironman_70_3',3,'#FF6319','#003DA5','🥇','tri'),
('ironman_703','703_oceanside','Ironman 70.3 Oceanside','70.3 Oceanside','Oceanside','USA','US',113,'ironman_70_3',3,'#009CDE','#FFFFFF','🥇','tri'),
('ironman_703','703_indian_wells','Ironman 70.3 Indian Wells','70.3 Indian Wells','Indian Wells','USA','US',113,'ironman_70_3',3,'#C41E3A','#FFD700','🥇','tri'),
('ironman_703','703_duesseldorf','Ironman 70.3 Duesseldorf','70.3 Duesseldorf','Duesseldorf','Germany','DE',113,'ironman_70_3',3,'#009EE0','#FFFFFF','🥇','tri'),
('ironman_703','703_hamburg','Ironman 70.3 Hamburg','70.3 Hamburg','Hamburg','Germany','DE',113,'ironman_70_3',3,'#009EE0','#FFFFFF','🥇','tri'),
('ironman_703','703_ruegen','Ironman 70.3 Ruegen','70.3 Ruegen','Ruegen','Germany','DE',113,'ironman_70_3',3,'#009EE0','#FFFFFF','🥇','tri'),

-- ============================================================
-- OLYMPIC TRIATHLON  (series='olympic_tri', distance_km=51.5, sport_type='tri')
-- ============================================================
('olympic_tri','oly_paris','World Triathlon Olympic (Paris)','OLY Paris','Paris','France','FR',51.5,'olympic_triathlon',5,'#002395','#D4AF37','🥇','tri'),
('olympic_tri','oly_hamburg','Hamburg Wasser World Triathlon','WTS Hamburg','Hamburg','Germany','DE',51.5,'olympic_triathlon',4,'#009EE0','#FFFFFF','🥇','tri'),
('olympic_tri','oly_yokohama','World Triathlon Yokohama','WTS Yokohama','Yokohama','Japan','JP',51.5,'olympic_triathlon',4,'#BC002D','#FFFFFF','🥇','tri'),
('olympic_tri','oly_abu_dhabi','World Triathlon Abu Dhabi','WTS Abu Dhabi','Abu Dhabi','UAE','AE',51.5,'olympic_triathlon',4,'#00732F','#FFFFFF','🥇','tri'),
('olympic_tri','oly_leeds','World Triathlon Leeds','WTS Leeds','Leeds','UK','GB',51.5,'olympic_triathlon',3,'#003DA5','#FFFFFF','🥇','tri'),
('olympic_tri','oly_montreal','World Triathlon Montreal','WTS Montreal','Montreal','Canada','CA',51.5,'olympic_triathlon',3,'#FF0000','#FFFFFF','🥇','tri'),
('olympic_tri','oly_bermuda','World Triathlon Bermuda','WTS Bermuda','Hamilton','Bermuda','BM',51.5,'olympic_triathlon',3,'#00247D','#CC142B','🥇','tri'),

-- ============================================================
-- GRAN FONDO / CYCLING  (series='gran_fondo', sport_type='bike')
-- ============================================================
('gran_fondo','stelvio','Stelvio Gran Fondo','Stelvio','Prato allo Stelvio','Italy','IT',151,'gran_fondo',5,'#009246','#CE2B37','🚴','bike'),
('gran_fondo','maratona_dolomiti','Maratona dles Dolomites','Maratona','Alta Badia','Italy','IT',138,'gran_fondo',5,'#009246','#CE2B37','🚴','bike'),
('gran_fondo','letape','L''Etape du Tour de France','L''Etape','Varies','France','FR',170,'gran_fondo',5,'#FFD700','#000000','🚴','bike'),
('gran_fondo','la_marmotte','La Marmotte','Marmotte','Bourg-d''Oisans','France','FR',174,'gran_fondo',5,'#002395','#ED2939','🚴','bike'),
('gran_fondo','ride_london','RideLondon','RideLondon','London','UK','GB',100,'gran_fondo',4,'#FF671F','#003DA5','🚴','bike'),
('gran_fondo','oetztaler','Oetztaler Radmarathon','Oetztaler','Soelden','Austria','AT',227,'gran_fondo',5,'#ED2939','#FFFFFF','🚴','bike'),
('gran_fondo','nove_colli','Nove Colli','Nove Colli','Cesenatico','Italy','IT',200,'gran_fondo',4,'#009246','#CE2B37','🚴','bike'),
('gran_fondo','flanders_sportive','Tour of Flanders Sportive','RVV Sportive','Oudenaarde','Belgium','BE',174,'gran_fondo',4,'#000000','#FFD700','🚴','bike'),
('gran_fondo','cape_town_cycle','Cape Town Cycle Tour','CT Cycle Tour','Cape Town','South Africa','ZA',109,'gran_fondo',4,'#007749','#FFB81C','🚴','bike'),
('gran_fondo','gfny','Gran Fondo New York','GFNY','New York','USA','US',160,'gran_fondo',4,'#FF6319','#000000','🚴','bike'),
('gran_fondo','mallorca_312','Mallorca 312','Mallorca 312','Playa de Muro','Spain','ES',312,'gran_fondo',5,'#FFCD00','#E30613','🚴','bike'),
('gran_fondo','haute_route','Haute Route Alps','Haute Route','Varies','France','FR',800,'stage_race',5,'#002395','#FFFFFF','🚴','bike'),
('gran_fondo','driedaagse','Driedaagse Brugge-De Panne Sportive','3 Daagse','Bruges','Belgium','BE',144,'gran_fondo',3,'#000000','#FFD700','🚴','bike'),
('gran_fondo','gran_fondo_strade','Strade Bianche Gran Fondo','Strade Bianche','Siena','Italy','IT',139,'gran_fondo',4,'#009246','#FFFFFF','🚴','bike'),
('gran_fondo','cyclassics','EuroEyes Cyclassics Hamburg','Cyclassics','Hamburg','Germany','DE',160,'gran_fondo',4,'#009EE0','#FFFFFF','🚴','bike'),

-- ============================================================
-- HYROX  (series='hyrox', distance_km=8, sport_type='hyrox')
-- ============================================================
('hyrox','hyrox_worlds','HYROX World Championships','HYROX WC','Varies','World','WW',8,'hyrox',5,'#D4AF37','#000000','⚡','hyrox'),
('hyrox','hyrox_koeln','HYROX Cologne','HYROX Cologne','Cologne','Germany','DE',8,'hyrox',4,'#E5A93D','#000000','⚡','hyrox'),
('hyrox','hyrox_muenchen','HYROX Munich','HYROX Munich','Munich','Germany','DE',8,'hyrox',4,'#E5A93D','#000000','⚡','hyrox'),
('hyrox','hyrox_hamburg','HYROX Hamburg','HYROX Hamburg','Hamburg','Germany','DE',8,'hyrox',4,'#E5A93D','#000000','⚡','hyrox'),
('hyrox','hyrox_berlin','HYROX Berlin','HYROX Berlin','Berlin','Germany','DE',8,'hyrox',4,'#E5A93D','#000000','⚡','hyrox'),
('hyrox','hyrox_frankfurt','HYROX Frankfurt','HYROX Frankfurt','Frankfurt','Germany','DE',8,'hyrox',3,'#E5A93D','#000000','⚡','hyrox'),
('hyrox','hyrox_stuttgart','HYROX Stuttgart','HYROX Stuttgart','Stuttgart','Germany','DE',8,'hyrox',3,'#E5A93D','#000000','⚡','hyrox'),
('hyrox','hyrox_duesseldorf','HYROX Dusseldorf','HYROX Dusseldorf','Dusseldorf','Germany','DE',8,'hyrox',3,'#E5A93D','#000000','⚡','hyrox'),
('hyrox','hyrox_london','HYROX London','HYROX London','London','UK','GB',8,'hyrox',4,'#E5A93D','#000000','⚡','hyrox'),
('hyrox','hyrox_manchester','HYROX Manchester','HYROX Manchester','Manchester','UK','GB',8,'hyrox',3,'#E5A93D','#000000','⚡','hyrox'),
('hyrox','hyrox_birmingham','HYROX Birmingham','HYROX Birmingham','Birmingham','UK','GB',8,'hyrox',3,'#E5A93D','#000000','⚡','hyrox'),
('hyrox','hyrox_paris','HYROX Paris','HYROX Paris','Paris','France','FR',8,'hyrox',4,'#E5A93D','#000000','⚡','hyrox'),
('hyrox','hyrox_madrid','HYROX Madrid','HYROX Madrid','Madrid','Spain','ES',8,'hyrox',3,'#E5A93D','#000000','⚡','hyrox'),
('hyrox','hyrox_barcelona','HYROX Barcelona','HYROX Barcelona','Barcelona','Spain','ES',8,'hyrox',3,'#E5A93D','#000000','⚡','hyrox'),
('hyrox','hyrox_milan','HYROX Milan','HYROX Milan','Milan','Italy','IT',8,'hyrox',3,'#E5A93D','#000000','⚡','hyrox'),
('hyrox','hyrox_rome','HYROX Rome','HYROX Rome','Rome','Italy','IT',8,'hyrox',3,'#E5A93D','#000000','⚡','hyrox'),
('hyrox','hyrox_amsterdam','HYROX Amsterdam','HYROX Amsterdam','Amsterdam','Netherlands','NL',8,'hyrox',3,'#E5A93D','#000000','⚡','hyrox'),
('hyrox','hyrox_rotterdam','HYROX Rotterdam','HYROX Rotterdam','Rotterdam','Netherlands','NL',8,'hyrox',3,'#E5A93D','#000000','⚡','hyrox'),
('hyrox','hyrox_zurich','HYROX Zurich','HYROX Zurich','Zurich','Switzerland','CH',8,'hyrox',3,'#E5A93D','#000000','⚡','hyrox'),
('hyrox','hyrox_vienna','HYROX Vienna','HYROX Vienna','Vienna','Austria','AT',8,'hyrox',3,'#E5A93D','#000000','⚡','hyrox'),
('hyrox','hyrox_prague','HYROX Prague','HYROX Prague','Prague','Czech Republic','CZ',8,'hyrox',3,'#E5A93D','#000000','⚡','hyrox'),
('hyrox','hyrox_warsaw','HYROX Warsaw','HYROX Warsaw','Warsaw','Poland','PL',8,'hyrox',3,'#E5A93D','#000000','⚡','hyrox'),
('hyrox','hyrox_stockholm','HYROX Stockholm','HYROX Stockholm','Stockholm','Sweden','SE',8,'hyrox',3,'#E5A93D','#000000','⚡','hyrox'),
('hyrox','hyrox_copenhagen','HYROX Copenhagen','HYROX Copenhagen','Copenhagen','Denmark','DK',8,'hyrox',3,'#E5A93D','#000000','⚡','hyrox'),
('hyrox','hyrox_helsinki','HYROX Helsinki','HYROX Helsinki','Helsinki','Finland','FI',8,'hyrox',3,'#E5A93D','#000000','⚡','hyrox'),
('hyrox','hyrox_nyc','HYROX New York','HYROX NYC','New York','USA','US',8,'hyrox',4,'#E5A93D','#000000','⚡','hyrox'),
('hyrox','hyrox_chicago','HYROX Chicago','HYROX Chicago','Chicago','USA','US',8,'hyrox',4,'#E5A93D','#000000','⚡','hyrox'),
('hyrox','hyrox_dallas','HYROX Dallas','HYROX Dallas','Dallas','USA','US',8,'hyrox',3,'#E5A93D','#000000','⚡','hyrox'),
('hyrox','hyrox_miami','HYROX Miami','HYROX Miami','Miami','USA','US',8,'hyrox',3,'#E5A93D','#000000','⚡','hyrox'),
('hyrox','hyrox_la','HYROX Los Angeles','HYROX LA','Los Angeles','USA','US',8,'hyrox',3,'#E5A93D','#000000','⚡','hyrox'),
('hyrox','hyrox_boston','HYROX Boston','HYROX Boston','Boston','USA','US',8,'hyrox',3,'#E5A93D','#000000','⚡','hyrox'),
('hyrox','hyrox_dubai','HYROX Dubai','HYROX Dubai','Dubai','UAE','AE',8,'hyrox',4,'#E5A93D','#000000','⚡','hyrox'),
('hyrox','hyrox_singapore','HYROX Singapore','HYROX Singapore','Singapore','Singapore','SG',8,'hyrox',3,'#E5A93D','#000000','⚡','hyrox'),
('hyrox','hyrox_hong_kong','HYROX Hong Kong','HYROX HK','Hong Kong','Hong Kong','HK',8,'hyrox',3,'#E5A93D','#000000','⚡','hyrox'),
('hyrox','hyrox_tokyo','HYROX Tokyo','HYROX Tokyo','Tokyo','Japan','JP',8,'hyrox',3,'#E5A93D','#000000','⚡','hyrox'),
('hyrox','hyrox_sydney','HYROX Sydney','HYROX Sydney','Sydney','Australia','AU',8,'hyrox',3,'#E5A93D','#000000','⚡','hyrox'),
('hyrox','hyrox_seoul','HYROX Seoul','HYROX Seoul','Seoul','South Korea','KR',8,'hyrox',3,'#E5A93D','#000000','⚡','hyrox'),

-- ============================================================
-- OPEN WATER SWIMMING  (series='open_water', sport_type='swim')
-- ============================================================
('open_water','english_channel','English Channel Swim','English Channel','Dover','UK','GB',34,'open_water_34k',5,'#003DA5','#FFFFFF','🏊','swim'),
('open_water','manhattan','Manhattan Island Marathon Swim','Manhattan Swim','New York','USA','US',46,'open_water_46k',5,'#FF6319','#003DA5','🏊','swim'),
('open_water','catalina','Catalina Channel Swim','Catalina','Catalina Island','USA','US',33,'open_water_33k',5,'#009CDE','#FFFFFF','🏊','swim'),
('open_water','bosphorus','Bosphorus Cross-Continental Swim','Bosphorus','Istanbul','Turkey','TR',6.5,'open_water_6k',4,'#E30A17','#FFFFFF','🏊','swim'),
('open_water','capri_naples','Capri-Naples Marathon Swim','Capri-Naples','Naples','Italy','IT',36,'open_water_36k',5,'#009246','#CE2B37','🏊','swim'),
('open_water','sun_moon_lake','Sun Moon Lake International Swimming Carnival','Sun Moon Lake','Nantou','Taiwan','TW',3,'open_water_3k',3,'#FE0000','#000095','🏊','swim'),
('open_water','midmar_mile','Midmar Mile','Midmar Mile','Pietermaritzburg','South Africa','ZA',1.6,'open_water_1mi',3,'#007749','#FFB81C','🏊','swim'),
('open_water','alcatraz','Alcatraz Sharkfest Swim','Alcatraz','San Francisco','USA','US',2.4,'open_water_2k',4,'#FF6319','#000000','🏊','swim'),
('open_water','rottnest','Rottnest Channel Swim','Rottnest','Perth','Australia','AU',19.7,'open_water_20k',4,'#00843D','#FFD700','🏊','swim')

ON CONFLICT (series, event_code) DO UPDATE SET
  event_name     = EXCLUDED.event_name,
  short_name     = EXCLUDED.short_name,
  city           = EXCLUDED.city,
  country        = EXCLUDED.country,
  country_code   = EXCLUDED.country_code,
  distance_km    = EXCLUDED.distance_km,
  distance_label = EXCLUDED.distance_label,
  iconic_level   = EXCLUDED.iconic_level,
  primary_color  = EXCLUDED.primary_color,
  secondary_color= EXCLUDED.secondary_color,
  logo_emoji     = EXCLUDED.logo_emoji,
  sport_type     = EXCLUDED.sport_type;

-- ============================================================
-- Verify counts
-- ============================================================
-- SELECT sport_type, series, count(*) AS cnt
--   FROM public.race_catalog
--  GROUP BY sport_type, series
--  ORDER BY sport_type, series;
