---
title: "About"
subtitle: "Learn more about the DH Tool Registry and its usage."

links:
  - url: "https://www.wikidata.org/wiki/Wikidata:WikiProject_DH_Tool_Registry"
    title: "Wikidata:Wikiproject DH Tool Registry"
    icon: "https://upload.wikimedia.org/wikipedia/commons/f/ff/Wikidata-logo.svg"

  - url: "https://github.com/FuReSH"
    title: "Kompetenzwerkstatt Digital Humanities on GitHub"
    icon: "https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg"
---


## DH Tool Registry

Digital Humanities tool directories are an essential service for researchers and for persons in research support roles, e.g. in libraries or IT departments. Datasets and services like [TaPOR 3](https://tapor.ca/) or the [SSH Open Marketplace](https://marketplace.sshopencloud.eu/) address the need for an overview of computational tools that are useful in digital humanities research contexts. However, in most cases continuous development of such services will be a challenge, as projects often lack permanent funding, rely on crowdsourced curators or depend on institutional or proprietary infrastructure which limit accessibility and sustainability.

## A modular approach based on Wikidata

The Digital Humanities Scholarship Team at the University Library at Humboldt-Universität zu Berlin together with the Methods Innovation Lab in NFDI4Memory, also located at Humboldt-Universität zu Berlin, jointly propose [a modular approach to the Tool Registry format](https://www.wikidata.org/wiki/Wikidata:WikiProject_DH_Tool_Registry), where the data will be stored in Wikidata, and which in short follows three directives:

a) the data is relatively independent from any specific web application and from any specific institutional setup (apart from Wikidata:) 
b) the basic data model is minimal and modular (can be expanded), so data can be pooled and curated for specific purposes at the same time
c) the frontend can be re-used to show curated datasets based on specific queries

We expect that software tools used in Digital Humanities contexts can be categorized using the [TaDiRAH taxonomy](https://vocabs.dariah.eu/tadirah/), so for this proof-of-concept instance we retrieve all items from Wikidata that have a Tadirah-ID. Please see the [Data Model](https://www.wikidata.org/wiki/Wikidata:WikiProject_DH_Tool_Registry/Data_Model) for further detail.

The objective is to establish a minimal infrastructure for subject-specific tool registries that leverage Wikidata for maintaining and sharing research tools and methods. This includes developing data models, curating tool samples, and creating workflows for querying and displaying data. Such an infrastructure would enhance visibility, accessibility, and sustainability of digital humanities resources, aligning with ongoing efforts to integrate Wikidata into research and GLAM institutions as a content provider and data curator.

## How does this work and what can I do here?

The application you are visiting is part of our proof of concept for the modular approach to tool registries. We have devised a web application which regularly queries Wikidata for any items referring to TaDiRAH entries. 

### Search and Browse

The application provides search and browsing functions for the resulting dataset and a nicer view on single items. In the search view, you can search for items in three ways:

#. search by name or label, using the search slot on the top of the page; e.g. search for Gephi, a network visualization tool
#. browse the sorted list using the alphabetic shortcuts (or the complete list)
#. filter by TaDiRAH categories using the drop-down menu on the right, in order to find tools for specific DH activities; e.g. show tools for Bistream Preservation or any other TaDiRAH category

### View single entries
By clicking an entry in the list, you can view detailed information about the tool. As we do not show all information available from Wikidata, you might want to take a look at the wikidata entry. The blue "Edit on Wikidata" on the right side of the page will bring you to the Wikidata entity, where you can browse the data -- and even edit it!

### Enhance!

Wikidata is a collaborative effort, and so is the aggregation of usable entries for our DH tool registry. An entry you have looked at has an error? Feel free to correct it by visiting the Wikidata page and editing the necessary data point. Or do you miss a tool that you deem rather canonical or most interesting for Digital Humanities research? You can also make new entries in Wikidata. In order for you entry to show up in this Tool Registry instance, add one or more TaDiRAH-IDs to your entry. It will eventually show up in our list once the data has been updated through our regular retrievals (every 24 hours or less).

## Get in touch

We have set up a [Wikiproject](https://www.wikidata.org/wiki/Wikidata:WikiProject_DH_Tool_Registry) in order to facilitate discussion about this approach, especially regarding the data model. Feel free to start a discussion there. Otherwise you can reach our teams via their websites:

| Digital Humanities Scholarship Team at the university library at Humboldt-Universität zu Berlin: <https://hu.berlin/kdh>
| NFDI4Memory Methods Innovation Lab: <https://4memory.de>
