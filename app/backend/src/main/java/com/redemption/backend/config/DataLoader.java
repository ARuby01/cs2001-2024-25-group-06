
package com.redemption.backend.config;

import java.util.Arrays;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

 import com.redemption.backend.entities.NGO;
 import com.redemption.backend.repositories.NGORepository;

@Configuration
public class DataLoader {
    @Bean
    @SuppressWarnings("unused")
    CommandLineRunner initDatabase(NGORepository ngoRepository) {
        return args -> {

            
            

            // NGO 1: Precious Plastic
            NGO ngo1 = new NGO();
            ngo1.setName("Precious Plastic");
            ngo1.setDescription("Provides DIY machines and guidelines to recycle plastic anywhere in the world.");
            ngo1.setWebsite("https://preciousplastic.com");
            ngo1.setLocation("Netherlands");
            ngo1.setFounded(2013);
            ngo1.setMission("To reduce plastic waste by empowering people to recycle locally.");
            ngo1.setKeyInitiatives(Arrays.asList("DIY Recycling Machines", "Plastic Recycling Workshops", "Global Community"));

            // NGO 2: Plastic Pollution Coalition
            NGO ngo2 = new NGO();
            ngo2.setName("Plastic Pollution Coalition");
            ngo2.setDescription("Global alliance working toward a world free of plastic pollution and its toxic impacts.");
            ngo2.setWebsite("https://www.plasticpollutioncoalition.org");
            ngo2.setLocation("California, USA");
            ngo2.setFounded(2009);
            ngo2.setMission("To stop plastic pollution and its toxic impacts on humans, animals, and the environment.");
            ngo2.setKeyInitiatives(Arrays.asList("Plastic-Free Communities", "Policy Advocacy", "Education Campaigns"));

            // NGO 3: Clean Ocean Project
            NGO ngo3 = new NGO();
            ngo3.setName("Clean Ocean Project");
            ngo3.setDescription("Works to clean up beaches and oceans from plastic waste.");
            ngo3.setWebsite("https://www.cleanoceanproject.org");
            ngo3.setLocation("Germany");
            ngo3.setFounded(2000);
            ngo3.setMission("To protect marine life by reducing plastic pollution.");
            ngo3.setKeyInitiatives(Arrays.asList("Beach Cleanups", "Awareness Campaigns", "Community Engagement"));

            // NGO 4: The Ocean Cleanup
            NGO ngo4 = new NGO();
            ngo4.setName("The Ocean Cleanup");
            ngo4.setDescription("Develops advanced technologies to collect plastic debris from oceans and rivers.");
            ngo4.setWebsite("https://theoceancleanup.com");
            ngo4.setLocation("Netherlands");
            ngo4.setFounded(2013);
            ngo4.setMission("To rid the world's oceans of plastic.");
            ngo4.setKeyInitiatives(Arrays.asList("Ocean Cleanup Systems", "River Interceptors"));

            // NGO 5: Plastic Oceans
            NGO ngo5 = new NGO();
            ngo5.setName("Plastic Oceans");
            ngo5.setDescription("Works to reduce plastic pollution through education and awareness.");
            ngo5.setWebsite("https://plasticoceans.org");
            ngo5.setLocation("United Kingdom");
            ngo5.setFounded(2009);
            ngo5.setMission("To change the world's attitude toward plastic within a generation.");
            ngo5.setKeyInitiatives(Arrays.asList("Documentaries", "Education Programs", "Community Outreach"));

            // NGO 6: Algalita Marine Research and Education Foundation
            NGO ngo6 = new NGO();
            ngo6.setName("Algalita Marine Research and Education Foundation");
            ngo6.setDescription("Conducts research and education on plastic pollution in marine environments.");
            ngo6.setWebsite("https://www.algalita.org");
            ngo6.setLocation("California, USA");
            ngo6.setFounded(1994);
            ngo6.setMission("To protect marine life from plastic pollution through research and education.");
            ngo6.setKeyInitiatives(Arrays.asList("Research Expeditions", "Education Programs", "Advocacy"));

            // NGO 7: Blue Ocean Watch
            NGO ngo7 = new NGO();
            ngo7.setName("Blue Ocean Watch");
            ngo7.setDescription("Promotes ocean conservation and plastic pollution awareness.");
            ngo7.setWebsite("https://www.blueoceanwatch.org");
            ngo7.setLocation("Global");
            ngo7.setFounded(2010);
            ngo7.setMission("To protect the ocean and marine life from plastic pollution.");
            ngo7.setKeyInitiatives(Arrays.asList("Awareness Campaigns", "Community Engagement", "Education Programs"));

            // NGO 8: Blutopia
            NGO ngo8 = new NGO();
            ngo8.setName("Blutopia");
            ngo8.setDescription("Promotes sustainable living and plastic-free oceans.");
            ngo8.setWebsite("https://www.blutopia.org");
            ngo8.setLocation("United Kingdom");
            ngo8.setFounded(2015);
            ngo8.setMission("To inspire people to live sustainably and protect the oceans.");
            ngo8.setKeyInitiatives(Arrays.asList("Education Programs", "Community Outreach", "Awareness Campaigns"));

            // NGO 9: Break Free From Plastic
            NGO ngo9 = new NGO();
            ngo9.setName("Break Free From Plastic");
            ngo9.setDescription("Global movement working toward a future free from plastic pollution.");
            ngo9.setWebsite("https://www.breakfreefromplastic.org");
            ngo9.setLocation("Global");
            ngo9.setFounded(2016);
            ngo9.setMission("To achieve a plastic-free future.");
            ngo9.setKeyInitiatives(Arrays.asList("Policy Advocacy", "Community Engagement", "Awareness Campaigns"));

            // NGO 10: 5 Gyres Institute
            NGO ngo10 = new NGO();
            ngo10.setName("5 Gyres Institute");
            ngo10.setDescription("Focuses on science, education, and community solutions to combat plastic pollution.");
            ngo10.setWebsite("https://www.5gyres.org");
            ngo10.setLocation("California, USA");
            ngo10.setFounded(2009);
            ngo10.setMission("To empower action against the global health crisis of plastic pollution through science, education, and advocacy.");
            ngo10.setKeyInitiatives(Arrays.asList("Research", "Education", "Advocacy"));

            // NGO 11: The Plastics Pact Network
            NGO ngo11 = new NGO();
            ngo11.setName("The Plastics Pact Network");
            ngo11.setDescription("Global network of initiatives working to reduce plastic waste.");
            ngo11.setWebsite("https://www.plasticspact.org");
            ngo11.setLocation("Global");
            ngo11.setFounded(2018);
            ngo11.setMission("To create a circular economy for plastics.");
            ngo11.setKeyInitiatives(Arrays.asList("Policy Advocacy", "Industry Collaboration", "Education Programs"));

            // NGO 12: Clean My Calanques
            NGO ngo12 = new NGO();
            ngo12.setName("Clean My Calanques");
            ngo12.setDescription("Works to clean up plastic waste in the Calanques National Park.");
            ngo12.setWebsite("https://www.cleanmycalanques.org");
            ngo12.setLocation("France");
            ngo12.setFounded(2017);
            ngo12.setMission("To protect the Calanques National Park from plastic pollution.");
            ngo12.setKeyInitiatives(Arrays.asList("Beach Cleanups", "Awareness Campaigns", "Community Engagement"));

            // NGO 13: Plastic Soup Foundation
            NGO ngo13 = new NGO();
            ngo13.setName("Plastic Soup Foundation");
            ngo13.setDescription("Works to reduce ocean plastic contamination through education and research.");
            ngo13.setWebsite("https://www.plasticsoupfoundation.org");
            ngo13.setLocation("Amsterdam, Netherlands");
            ngo13.setFounded(2011);
            ngo13.setMission("No plastic waste in our water!");
            ngo13.setKeyInitiatives(Arrays.asList("Beat the Microbead", "Ocean Clean Wash", "Plastic Health Coalition"));

            // NGO 14: Parley for the Oceans
            NGO ngo14 = new NGO();
            ngo14.setName("Parley for the Oceans");
            ngo14.setDescription("Works to protect the oceans from plastic pollution through collaboration and innovation.");
            ngo14.setWebsite("https://www.parley.tv");
            ngo14.setLocation("Global");
            ngo14.setFounded(2012);
            ngo14.setMission("To end marine plastic pollution.");
            ngo14.setKeyInitiatives(Arrays.asList("Ocean Plastic Cleanups", "Innovation", "Education Programs"));

            // NGO 15: Surfrider Foundation
            NGO ngo15 = new NGO();
            ngo15.setName("Surfrider Foundation");
            ngo15.setDescription("Protects oceans, waves, and beaches through various initiatives.");
            ngo15.setWebsite("https://www.surfrider.org");
            ngo15.setLocation("California, USA");
            ngo15.setFounded(1984);
            ngo15.setMission("To protect and enjoy the world's oceans, waves, and beaches.");
            ngo15.setKeyInitiatives(Arrays.asList("Beach Cleanups", "Ocean Protection", "Plastic Pollution Campaigns"));

            // NGO 16: The UK Plastics Pact
            NGO ngo16 = new NGO();
            ngo16.setName("The UK Plastics Pact");
            ngo16.setDescription("Aims to create a circular economy for plastics in the UK.");
            ngo16.setWebsite("https://www.wrap.org.uk/uk-plastics-pact");
            ngo16.setLocation("United Kingdom");
            ngo16.setFounded(2018);
            ngo16.setMission("To eliminate unnecessary plastic and ensure all plastic is reusable, recyclable, or compostable.");
            ngo16.setKeyInitiatives(Arrays.asList("Industry Collaboration", "Policy Advocacy", "Education Programs"));

            // NGO 17: Circula El Plástico (Chilean Plastics Pact)
            NGO ngo17 = new NGO();
            ngo17.setName("Circula El Plástico (Chilean Plastics Pact)");
            ngo17.setDescription("Works to reduce plastic waste in Chile.");
            ngo17.setWebsite("https://www.circulaplastico.cl");
            ngo17.setLocation("Chile");
            ngo17.setFounded(2019);
            ngo17.setMission("To create a circular economy for plastics in Chile.");
            ngo17.setKeyInitiatives(Arrays.asList("Industry Collaboration", "Policy Advocacy", "Education Programs"));

            // NGO 18: Kenya Plastics Pact
            NGO ngo18 = new NGO();
            ngo18.setName("Kenya Plastics Pact");
            ngo18.setDescription("Aims to reduce plastic waste in Kenya.");
            ngo18.setWebsite("https://www.kpp.or.ke");
            ngo18.setLocation("Kenya");
            ngo18.setFounded(2021);
            ngo18.setMission("To create a circular economy for plastics in Kenya.");
            ngo18.setKeyInitiatives(Arrays.asList("Industry Collaboration", "Policy Advocacy", "Education Programs"));

            // NGO 19: India Plastics Pact
            NGO ngo19 = new NGO();
            ngo19.setName("India Plastics Pact");
            ngo19.setDescription("Works to reduce plastic waste in India.");
            ngo19.setWebsite("https://www.indiaplasticspact.org");
            ngo19.setLocation("India");
            ngo19.setFounded(2021);
            ngo19.setMission("To create a circular economy for plastics in India.");
            ngo19.setKeyInitiatives(Arrays.asList("Industry Collaboration", "Policy Advocacy", "Education Programs"));

            // NGO 20: Pacto por los Plásticos Colombia
            NGO ngo20 = new NGO();
            ngo20.setName("Pacto por los Plásticos Colombia");
            ngo20.setDescription("Works to reduce plastic waste in Colombia.");
            ngo20.setWebsite("https://www.pactoporlosplasticos.co");
            ngo20.setLocation("Colombia");
            ngo20.setFounded(2020);
            ngo20.setMission("To create a circular economy for plastics in Colombia.");
            ngo20.setKeyInitiatives(Arrays.asList("Industry Collaboration", "Policy Advocacy", "Education Programs"));

            // NGO 21: Pacte National sur les emballages plastiques (French Plastics Pact)
            NGO ngo21 = new NGO();
            ngo21.setName("Pacte National sur les emballages plastiques (French Plastics Pact)");
            ngo21.setDescription("Works to reduce plastic waste in France.");
            ngo21.setWebsite("https://www.pacteplastique.fr");
            ngo21.setLocation("France");
            ngo21.setFounded(2019);
            ngo21.setMission("To create a circular economy for plastics in France.");
            ngo21.setKeyInitiatives(Arrays.asList("Industry Collaboration", "Policy Advocacy", "Education Programs"));

            // NGO 22: Pacto de los Plásticos de México
            NGO ngo22 = new NGO();
            ngo22.setName("Pacto de los Plásticos de México");
            ngo22.setDescription("Works to reduce plastic waste in Mexico.");
            ngo22.setWebsite("https://www.pactoplasticos.mx");
            ngo22.setLocation("Mexico");
            ngo22.setFounded(2020);
            ngo22.setMission("To create a circular economy for plastics in Mexico.");
            ngo22.setKeyInitiatives(Arrays.asList("Industry Collaboration", "Policy Advocacy", "Education Programs"));

            // NGO 23: Pacto Português para os Plásticos (Portuguese Plastics Pact)
            NGO ngo23 = new NGO();
            ngo23.setName("Pacto Português para os Plásticos (Portuguese Plastics Pact)");
            ngo23.setDescription("Works to reduce plastic waste in Portugal.");
            ngo23.setWebsite("https://www.pactoplasticos.pt");
            ngo23.setLocation("Portugal");
            ngo23.setFounded(2020);
            ngo23.setMission("To create a circular economy for plastics in Portugal.");
            ngo23.setKeyInitiatives(Arrays.asList("Industry Collaboration", "Policy Advocacy", "Education Programs"));

            // NGO 24: Polski Pakt Plastikowy (Polish Plastics Pact)
            NGO ngo24 = new NGO();
            ngo24.setName("Polski Pakt Plastikowy (Polish Plastics Pact)");
            ngo24.setDescription("Works to reduce plastic waste in Poland.");
            ngo24.setWebsite("https://www.paktplastikowy.pl");
            ngo24.setLocation("Poland");
            ngo24.setFounded(2020);
            ngo24.setMission("To create a circular economy for plastics in Poland.");
            ngo24.setKeyInitiatives(Arrays.asList("Industry Collaboration", "Policy Advocacy", "Education Programs"));

            // NGO 25: ANZPAC Plastics Pact (Australia, New Zealand, and Pacific Islands)
            NGO ngo25 = new NGO();
            ngo25.setName("ANZPAC Plastics Pact (Australia, New Zealand, and Pacific Islands)");
            ngo25.setDescription("Works to reduce plastic waste in the ANZPAC region.");
            ngo25.setWebsite("https://www.anzpacplasticspact.org");
            ngo25.setLocation("Australia, New Zealand, and Pacific Islands");
            ngo25.setFounded(2021);
            ngo25.setMission("To create a circular economy for plastics in the ANZPAC region.");
            ngo25.setKeyInitiatives(Arrays.asList("Industry Collaboration", "Policy Advocacy", "Education Programs"));

            // NGO 26: Plastic Free July
            NGO ngo26 = new NGO();
            ngo26.setName("Plastic Free July");
            ngo26.setDescription("Encourages people to reduce their plastic consumption during July and beyond.");
            ngo26.setWebsite("https://www.plasticfreejuly.org");
            ngo26.setLocation("Global");
            ngo26.setFounded(2011);
            ngo26.setMission("To reduce plastic waste worldwide.");
            ngo26.setKeyInitiatives(Arrays.asList("Awareness Campaigns", "Community Engagement", "Education Programs"));

            // NGO 27: Bye Bye Plastic Bags
            NGO ngo27 = new NGO();
            ngo27.setName("Bye Bye Plastic Bags");
            ngo27.setDescription("Youth-led movement to eliminate plastic bags.");
            ngo27.setWebsite("https://www.byebyeplasticbags.org");
            ngo27.setLocation("Global");
            ngo27.setFounded(2013);
            ngo27.setMission("To create a world free of plastic bags.");
            ngo27.setKeyInitiatives(Arrays.asList("Awareness Campaigns", "Policy Advocacy", "Community Engagement"));

            // NGO 28: Ocean Conservancy
            NGO ngo28 = new NGO();
            ngo28.setName("Ocean Conservancy");
            ngo28.setDescription("Works to protect the ocean from plastic pollution and other threats.");
            ngo28.setWebsite("https://www.oceanconservancy.org");
            ngo28.setLocation("Washington, D.C., USA");
            ngo28.setFounded(1972);
            ngo28.setMission("To protect the ocean from today's greatest challenges.");
            ngo28.setKeyInitiatives(Arrays.asList("Beach Cleanups", "Policy Advocacy", "Education Programs"));

            // Save all NGOs to the database
            ngoRepository.saveAll(Arrays.asList(
               
            ));
        };
    }
}


