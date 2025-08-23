---
title: "Get Involved"
subtitle: "Learn how you can contribute to continuously improving the data quality of DH tools in Wikidata."

links:
  - url: "https://auth.wikimedia.org/wikidatawiki/wiki/Special:CreateAccount?useformat=desktop&usesul3=1&returnto=Q122946371&centralauthLoginToken=58673a364cd12805fa9542ebf757f961"
    title: "Wikidata Registration"
    icon: "https://upload.wikimedia.org/wikipedia/commons/f/ff/Wikidata-logo.svg"

  - url: "https://auth.wikimedia.org/wikidatawiki/wiki/Special:UserLogin?useformat=desktop&usesul3=1&returnto=Wikidata%3AMain+Page&centralauthLoginToken=298a417c858fc5d4deee7af43741e31a"
    title: "Wikidata Login-in"
    icon: "https://upload.wikimedia.org/wikipedia/commons/f/ff/Wikidata-logo.svg"
---

## Working with Wikidata

To edit or add new items in Wikidata, you first need an account.  

### 1. Register and Log In

First, create a user account on Wikidata (and therefore on Wikimedia) if you have not already done so. Although it is technically possible to edit Wikidata without an account, it is not recommended because your IP address will be visible. In such cases, Wikidata will display a warning before any data is published.  

<!--![Fig. 1: Wikidata warning about IP address visibility](/images/wd-screenshot-ip-address.png)  -->

> **Note:** If you only want to search or query tools within Wikidata, you can do so without an account.

👉 **Action:** Create your first Wikimedia account by clicking the registration link in the right-hand sidebar. Once registered, simply log in with your credentials.

### 2. Use the Linked Data (LD) Interface

In this tutorial, we will show how to edit or add tools using Wikidata’s so-called *Linked Data (LD) Interface*. This interface provides direct access to Wikidata’s data and allows you to update items immediately. It is well-suited for editing only a few items.  

If you want to make large-scale changes, there are other tools that are more suitable for bulk updates. Within the *ToolFindr* context, we assume that only single tools will be updated, so we will focus on the LD Interface.  

When you click the **Edit on Wikidata** button in the detailed *ToolFindr* view of a tool, you are redirected to that item’s page in the LD Interface on Wikidata.  

<!-- ![Fig. 2: Item view in Wikidata’s Linked Data Interface](/images/wd-screenshot-ld-interface.png)  -->

The LD Interface is intentionally simple, so you can quickly capture and edit the most relevant data. Each item consists of:

- **Name**  
- **Abbreviation(s)**  
- **Description**  
- **Statements**  
- **Identifiers**  

From here, you can edit the data for the tool you want to update.  

**Learn more:**
- **Data Model**: [Wikidata:Data model](https://www.wikidata.org/wiki/Wikidata:Data_model)  
- **Wikibase**: [Wikidata:Wikibase](https://www.wikidata.org/wiki/Wikidata:Wikibase/de)  
- **LD Interface Documentation**: [Linked Data Interface](https://www.wikidata.org/wiki/Wikidata:Data_access#Linked_Data_Interface_(URI))

---

## Editing a Tool

As outlined above, you can edit a tool’s name, description, and statements. Identifiers are less relevant for our use case, so we will skip them here.  

Editing within the LD Interface is straightforward. For each piece of data, you will see an **🖊️ edit** link (or *bearbeiten* in German) in the upper right corner.  

You can perform two main actions:  
1. **Update existing data**  
2. **Add new statements**

### Updating Existing Data

Click the **edit** link next to the value you want to change — whether it is the tool’s name, description, or a statement. After making your changes, click **save** to apply them, or **cancel** to discard them.  

> **See also:** [Wikidata:Tools/Edit items](https://www.wikidata.org/wiki/Wikidata:Tools/Edit_items) for a list of external tools.

### Adding New Statements

Sometimes, you may need to add new information about a tool that is not already listed in Wikidata. In Wikidata, any factual piece of information is expressed as a **statement**. A statement consists of:

- **Property** – the type of information (e.g., *developer*, *programming language*, *official website*)  
- **Value** – the specific detail for that property (e.g., *University of Exampleland*, *Python*, *https://example.org*)  

**Example:**
> **developer** → *University of Exampleland*  

#### Step-by-Step: Adding a Statement

1. **Locate the Statements Section**  
   Scroll down the item page until you find the section titled **Statements**.

2. **Click “Add statement”**  
   This button is usually below the existing statements.

3. **Choose a Property**  
   - Start typing the name of the property (e.g., *developer*).  
   - Wikidata will suggest matching properties as you type — select the correct one.

4. **Enter the Value**  
   - If the value is another Wikidata item (e.g., an institution), start typing its name and choose it from the dropdown list.  
   - If it is text or a number (e.g., a URL, a publication year), enter it directly.

5. **Add References (Recommended)**  
   - Click **add reference** to link to a reliable source for your information.  
   - This could be a project website, a publication, or another verifiable source.

6. **Save Your Statement**  
   - Click **publish** (or *veröffentlichen*) to confirm.

#### Example: Adding a Programming Language

Imagine you are updating the Wikidata entry for a DH tool named *TextParserPro*.  
You discover from the official website that it is written in **Python**.

1. Scroll to **Statements** → click **Add statement**.  
2. In the **property** field, type *programming language* and select it.  
3. In the **value** field, type *Python* and choose the correct Wikidata item.  
4. Add a **reference**: official website link.  
5. Click **publish**.  

The new statement will now appear in the tool’s Wikidata entry.

---

✨ **Tips for Good Data Entry**
- Always double-check that you are choosing the correct **property** and **value** — many terms can look similar.  
- Use references whenever possible. This increases trust in the data and helps others verify your work.  
- Be consistent: if you add the *developer* for one tool, consider doing the same for other tools you know.



<!-- ## Add a new Tool

### Use the Cradle Tool

Besides the Linked Data interface there exist other so called Wikidata tool with which you are able to edit single items. One of them is the *Cradle Tool* where we stored the basic data model for DH tools. With it you can now use an intuitively better interface

https://cradle.toolforge.org/?#/subject/dh_research_tools

## Query a Data Subset 

## Cite a Tool
-->


