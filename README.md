# Astro's Canine Rescue

## Student Information
| Field | Detail |
|---|---|
| Student Name | Brittany Marie Haupt |
| Student Number | ST10500773 |
| Module | Web Development (Introduction) — WEDE5020/p/w |
| Academic Year | 2026 |

---

## Project Overview
This repository contains the source code for the **Astro's Canine Rescue** website, developed as part of the WEDE5020 Portfolio of Evidence (PoE). Astro's Canine Rescue is a fictional non-profit organisation (NPO) based in Table View, South Africa, that rescues, rehabilitates, and rehomes abandoned and abused domestic animals. 

---

## Website Goals and Objectives
1. Establish a professional online presence for the NPO.
2. Enable prospective adopters to browse available animals and submit adoption enquiries.
3. Provide a clear pathway for volunteers and sponsors to engage with the organisation.
4. Promote community awareness of animal welfare issues in Cape Town.
5. Optimise for search engines to improve organic discoverability.

---

## Key Features and Functionality
| Feature | Status |
|---|---|
| 6 fully structured HTML pages | Part 1 |
| Semantic HTML5 layout (header, nav, main, footer) | Part 1 |
| Navigation linking all 6 pages | Part 1 |
| Enquiry form (volunteer) | Part 1 (HTML structure) |
| Contact form with general messaging | Part 1 (HTML structure) |
| Two embedded shelter location maps | Part 1  |

| External CSS stylesheet | Part 2 |
| Responsive design (mobile & tablet) | Part 2 |

| JavaScript form validation |  Part 3 |
| Lightbox image gallery |  Part 3 |
| Animal filter / search |  Part 3 |


---

## Timeline and Milestones
| Milestone | Target Date | Status |
|---|---|---|
| Part 1: HTML structure & project proposals | Week 2 |  Complete |
| Part 2: CSS styling & responsive design | Week 6 |  Pending |
| Part 3: JavaScript, forms & SEO | Week 10 |  Pending |
| Final review & testing | Week 11 |  Pending |
| PoE submission | Week 12 | Pending |

---

## Part 1 Details

### File and Folder Structure
```
astroswebsite/
├── index.html          # Homepage — hero, impact stats, featured animals
├── about.html          # About Us — history, mission, vision, team
├── services.html       # Adoptions — animal listings, adoption process, fees
├── enquiry.html        # Volunteer form
├── donate.html         # Donate — donation and wish list section
├── contact.html        # Contact — shelter details, maps, general message form
├── css/
│   └── style.css       # External stylesheet (styled in Part 2)
├── js/
│   └── script.js         # Main JavaScript file (implemented in Part 3)
└── images/
    ├── volunteers/
    |   ├── tadeusz-lakota-tk5LWGNiWVs-unsplash.jpg
    |   ├── thamara-maura-wA-6Tsv2_Fc-unsplash.jpg 
    |   └── james-mcdermott-_fuZknh-yFg-unsplash.jpg
    └── team/
    |    ├── jake-nackos-IF9TK5Uy-KI-unsplash.jpg
    |    ├── karsten-winegeart-bwDnRf-r4u8-unsplash.jpg
    |    ├── nartan-buyukyildiz-hr_feH2URs0-unsplash.jpg
    |    └── anny-postma-zNxOw2JFNKs-unsplash.jpg
    ├──  victor-g-x5oPmHmY3kQ-unsplash.jpg  #All the dog pictures and the logo
    ├──  alvan-nee-8g0D8ZfFXyA-unsplash.jpg
    ├──  ash-v0_MCllHY9M-unsplash.jpg
    ├── baptist-standaert-mx0DEnfYxic-unsplash.jpg
    ├── brooke-cagle-Ntm4C2lCWxQ-unsplash.jpg
    ├── cristofer-maximilian-5_nJw3UUgpQ-unsplash.jpg
    ├── isaac-benhesed-6TEBZsjQbEc-unsplash.jpg
    ├── karsten-winegeart-Qb7D1xw28Co-unsplash.jpg
    ├── kinshuk-bose-pkgznCMKDXo-unsplash.jpg
    ├── logo.png
    └── nathalie-ehrnleitner-SApQiu5GIdQ-unsplash.jpg
```

### Sitemap

The website uses a flat navigation structure where all six pages are accessible from every page via the shared navigation bar.

```
┌─────────────────────────────────────────────────────────────────┐
│              Shared Header / Navigation Bar                     │
└─────────────────────────────────────────────────────────────────┘
       │           │           │           │          │         │
  ┌────┴───┐  ┌────┴───┐   ┌───┴────┐  ┌───┴───┐   ┌──┴────┐  ┌─┴──────┐
  │  Home  │  │ About  │   │  Dogs  │  │ Enq.  │   │Donate │  │Contact │
  │index   │  │about   │   │services│  │enquiry│   │donate │  │contact │
  │.html   │  │.html   │   │.html   │  │.html  │   │.html  │  │.html   │
  └────┬───┘  └────┬───┘   └───┬────┘  └───┬───┘   └──┬────┘  └─┬──────┘
       │           │           │           │          │          │
  • Hero banner  • Mission   • Filter      • Why vol. • Impact   • Contact info
  • Dog cards    • Our story • Dog list.   • Require. • Donate   • Message form
  • Our mission  • The team  • Adopt steps • Apply    • EFT      • Leaflet map
  • Impact stats • Values    • FAQs        • Form     • Wish list • FAQs
  • Get involved • Partners                • Stories             • Emergency

┌─────────────────────────────────────────────────────────────────┐
│       Shared Footer — Quick Links · Contact · Social Media      │
└─────────────────────────────────────────────────────────────────┘
```
You can find a image of the sitemap inside the folder Sitemap in the Research and Content folder that was submitted.

---

## Changelog

### [Part 1] - April 2026

#### Initial Commit
- Created public GitHub repository and initialised with README.md.

#### HTML Structure
- Created `index.html`: homepage with hero section, impact stats, featured animal cards, our mission section and volunteer section.
- Created `about.html`: organisation history section, mission, meet our team section and our partner section.
- Created `services.html`: (Available Dogs) search and filter feature, all 9 dogs listed with details, adoption process and adoption FAQ.
- Created `enquiry.html`: Why volunteer with us, volunteer requirements, how to apply, volunteer stories section and then a volunteer application form.
- Created `contact.html`: Get in touch section with all relevant details, plan to implement a map, send us a message section, FAQ section and emergency section.
- Created `donate.html` : Show impact a donation would make section, make a donation section and then a wish list section

#### CSS Placeholder
- Created `css/style.css` for part 2

#### JavaScript Placeholder
- Created `js/main.js` for part 3

#### Assets
- Created `images/` directory with sub-folder for volunteers and team. All dog pictures are in the main images folder.

---

## References
Astro’s Canine Rescue, 2026. *Astro’s Canine Rescue official website*. [Online] Available at: <http://astrocanine.org> [Accessed 18 April 2026].

Benhesed, I., 2026. *Rescue shelter founding image*. [Online] Unsplash. Available at: <https://unsplash.com/> [Accessed 18 April 2026].

Bose, K., 2026. *German Shepherd dog portrait*. [Online] Unsplash. Available at: <https://unsplash.com/> [Accessed 18 April 2026].

Buyukyildiz, N., 2026. *Vet liaison portrait*. [Online] Unsplash. Available at: <https://unsplash.com/> [Accessed 18 April 2026].

Cagle, B., 2026. *Goldendoodle dog portrait*. [Online] Unsplash. Available at: <https://unsplash.com/> [Accessed 18 April 2026].

Ehrnleitner, N., 2026. *Appenzeller Sennenhund dog portrait*. [Online] Unsplash. Available at: <https://unsplash.com/> [Accessed 18 April 2026].

Font Awesome, 2026. *Font Awesome Free Icons*. [Online] Available at: <https://fontawesome.com/> [Accessed 18 April 2026].

Google Fonts, 2026. *Merriweather and Source Sans 3*. [Online] Available at: <https://fonts.google.com/> [Accessed 18 April 2026].

Lakota, T., 2026. *Male volunteer portrait (David)*. [Online] Unsplash. Available at: <https://unsplash.com/> [Accessed 18 April 2026].

Leaflet.js, 2026. *Leaflet interactive maps*. [Online] Available at: <https://leafletjs.com/> [Accessed 18 April 2026].

Maura, T., 2026. *Female volunteer portrait (Amy)*. [Online] Unsplash. Available at: <https://unsplash.com/> [Accessed 18 April 2026].

Maximilian, C., 2026. *Weimaraner dog portrait*. [Online] Unsplash. Available at: <https://unsplash.com/> [Accessed 18 April 2026].

McDermott, J., 2026. *Events volunteer portrait* (Zanele). [Online] Unsplash. Available at: <https://unsplash.com/> [Accessed 18 April 2026].

Nackos, J., 2026. *Volunteer coordinator portrait*. [Online] Unsplash. Available at: <https://unsplash.com/> [Accessed 18 April 2026].

Nee, A., 2026. *Scottish Terrier X Yorkie dog portrait*. [Online] Unsplash. Available at: <https://unsplash.com/> [Accessed 18 April 2026].

Postma, D., 2026. *Shelter manager portrait*. [Online] Unsplash. Available at: <https://unsplash.com/> [Accessed 18 April 2026].

Standaert, B., 2026. *Border Collie dog portrait*. [Online] Unsplash. Available at: <https://unsplash.com/> [Accessed 18 April 2026].

Unsplash contributor, 2026. *Golden Retriever dog portrait*. [Online] Unsplash. Available at: <https://unsplash.com/> [Accessed 18 April 2026].

Unsplash contributor, 2026. *Husky dog portrait*. [Online] Unsplash. Available at: <https://unsplash.com/> [Accessed 18 April 2026].

Unsplash contributor, 2026. *Rescued dog looking hopefully at the camera*. [Online] Unsplash. Available at: <https://unsplash.com/> [Accessed 18 April 2026].

Winegeart, K., 2026. *Shih Tzu dog portrait*. [Online] Unsplash. Available at: <https://unsplash.com/> [Accessed 18 April 2026].

Wingeart, K., 2026. *Founder team at shelter*. [Online] Unsplash. Available at: <https://unsplash.com/> [Accessed 18 April 2026].

