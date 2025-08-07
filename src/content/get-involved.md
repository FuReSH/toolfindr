---
title: "Get Involved"
subtitle: "Learn how you can contribute to continuously improving the data quality of DH tools in Wikidata."

links:
  - url: "https://auth.wikimedia.org/wikidatawiki/wiki/Special:CreateAccount?useformat=desktop&usesul3=1&returnto=Q122946371&centralauthLoginToken=58673a364cd12805fa9542ebf757f961"
    title: "Wikidata Registration"
    icon: "https://upload.wikimedia.org/wikipedia/commons/f/ff/Wikidata-logo.svg"

  - url: "https://github.com/FuReSH"
    title: "Wikidata Login-in"
    icon: "https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg"
---

## Working with Wikidata

To edit or to add new items on Wikidata first 
### Register and Log In

First of all, you'll need to create an user account on Wikidata respectively Wikimedia if you haven't done already. Though you can edit in Wikidata without having an account it is not recommended as your IP address will be exposed. In this case Wikidata will warn you before any data is being published (see Fig.1)

![Fig.1: Wikidata warning on IP address exposing](/images/wd-screenshot-ip-address.png)

So create an account here: 

And then simply log in with you credentials.

If you only want to search or query for tools within Wikidata you can do it without an user account.

### Use the LD Interface

In this tutorial we will show how to edit or add tools with the so called Linked Data (LD) Interface by Wikidata. This interface guarantees the access to the Wikidata data und you can directly update items here. This is useful if you want to edit only a few Wikidata items. However if you would like to perform a bulk update on Wikidata there are other tools that a more sufficient for this usecase. Within the context of the *ToolFindr* we assume that only single tools will be updated in Wikidata and therefore we will concentrate on the LD Interface.

As soon as you clicked in on the button "Edit on Wikidata" in the *ToolFindr* detailed view of a tool you will be redirected to the item on Wikidata (Fig.2) in the Linked Data Interface.

![Fig.2: Item view in Linked Data Interface of Wikidata ](/images/wd-screenshot-ld-interface.png)

The LD Interface is kept very simple meaning you can quickly capture the relevant data. In a nutshell each item consists of:

- name
- abbreviation(s)
- description
- statements
- identifiers

From here we now can edit the data on the tool we want to update.

If you want to learn more about Wikidata's under the hood data model and software *Wikibase* you can read more about it on the official documentation:

- Data Model: https://www.wikidata.org/wiki/Wikidata:Data_model
- Wikibase: https://www.wikidata.org/wiki/Wikidata:Wikibase/de

Please also refer to the official LD Interface documentation by Wikimedia: https://www.wikidata.org/wiki/Wikidata:Data_access#Linked_Data_Interface_(URI)

## Edit a Tool

<!-- ## Add a new Tool

### Use the Cradle Tool

Besides the Linked Data interface there exist other so called Wikidata tool with which you are able to edit single items. One of them is the *Cradle Tool* where we stored the basic data model for DH tools. With it you can now use an intuitively better interface

https://cradle.toolforge.org/?#/subject/dh_research_tools

## Query a Data Subset -->


