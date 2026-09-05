<!-- view-meta: created=2026-08-27; updated=2026-08-27 -->
<template>
  <AltLayout
    title="Les régions de France"
    subtitle="Treize régions en métropole, cinq outre-mer — et la façon d'en parler."
  >
    <main class="lesson">

      <div class="rule">
        Depuis le 1<sup>er</sup> janvier 2016, la France métropolitaine compte
        <strong class="hl-blue">treize régions</strong> au lieu de vingt-deux&nbsp;: la
        réforme en a fusionné plusieurs. Chaque région a un <strong>chef-lieu</strong>,
        la ville où siège le conseil régional. Attention&nbsp;: une région française a
        beaucoup <strong>moins de pouvoirs</strong> qu'une <em>comunidad autónoma</em>
        espagnole — les lois, l'école et la santé restent nationales.
      </div>

      <!-- ── Les treize régions ──────────────────── -->
      <article>
        <h2>Les treize régions métropolitaines</h2>
        <p class="method">
          Elles sont classées ici <strong>du nord au sud</strong>. Le nom en gras est celui
          de la région&nbsp;; dessous, son <strong>chef-lieu</strong>.
        </p>

        <ul class="photo-grid">
          <li v-for="region in regions" :key="region.slug" class="photo-card">
            <img
              :src="`/img/culture/regions/${region.slug}.webp`"
              :alt="region.alt"
              width="560"
              height="373"
              loading="lazy"
              decoding="async"
            />
            <div class="photo-body">
              <strong class="photo-name">{{ region.name }}</strong>
              <span class="photo-chief">Chef-lieu&nbsp;: {{ region.chief }}</span>
              <p class="photo-text">{{ region.text }}</p>
            </div>
          </li>
        </ul>

        <div class="note">
          La <strong>Corse</strong> n'est plus tout à fait une région&nbsp;: depuis 2018,
          c'est une <em>collectivité de Corse</em>, avec un statut particulier. On la compte
          malgré tout comme la treizième.
        </div>
      </article>

      <!-- ── En, dans le, dans les ───────────────── -->
      <article>
        <h2>Dire où l'on est</h2>
        <p class="method">
          La préposition dépend du <strong>genre du nom de la région</strong>, exactement
          comme pour les pays.
        </p>

        <table>
          <caption class="sr-only">Préposition à employer devant le nom d'une région</caption>
          <thead>
            <tr><th>Le nom est…</th><th>On dit</th><th>Exemples</th><th>En espagnol</th></tr>
          </thead>
          <tbody>
            <tr>
              <td>féminin<br /><em>(la plupart)</em></td>
              <td><strong class="hl-blue">en</strong></td>
              <td>en Bretagne, en Normandie, en Occitanie, en Corse</td>
              <td><em>en Bretaña…</em></td>
            </tr>
            <tr>
              <td>masculin</td>
              <td><strong class="hl-blue">dans le</strong></td>
              <td>dans le Grand Est, dans le Centre-Val de Loire</td>
              <td><em>en el…</em></td>
            </tr>
            <tr>
              <td>pluriel</td>
              <td><strong class="hl-blue">dans les</strong></td>
              <td>dans les Hauts-de-France, dans les Pays de la Loire</td>
              <td><em>en los…</em></td>
            </tr>
            <tr>
              <td>une ville</td>
              <td><strong class="hl-blue">à</strong></td>
              <td>à Paris, à Lyon, à Marseille</td>
              <td><em>en París…</em></td>
            </tr>
          </tbody>
        </table>

        <div class="example">
          <p>— Vous passez vos vacances <strong>en</strong> Provence&nbsp;?</p>
          <p>— Non, cette année nous allons <strong>dans les</strong> Hauts-de-France,
            chez ma sœur qui habite <strong>à</strong> Lille.</p>
        </div>

        <div class="attention">
          <strong>Devant les régions d'outre-mer</strong>, c'est la même règle&nbsp;:
          <em>en Guadeloupe, en Martinique, en Guyane</em>, mais <em>à La Réunion</em> et
          <em>à Mayotte</em>. Et si l'on ajoute le mot <em>région</em> devant le nom, tout
          se simplifie&nbsp;: <strong class="hl-blue">en région</strong> Grand Est,
          <strong class="hl-blue">en région</strong> Centre-Val de Loire.
        </div>
      </article>

      <!-- ── Le vocabulaire du territoire ────────── -->
      <article>
        <h2>Les mots du territoire</h2>
        <table class="dense">
          <caption class="sr-only">Vocabulaire administratif et géographique</caption>
          <thead>
            <tr><th>Français</th><th>Définition</th><th>Español</th></tr>
          </thead>
          <tbody>
            <tr><td><strong>une région</strong></td><td>le plus grand découpage administratif</td><td><em>una región</em></td></tr>
            <tr><td><strong>un département</strong></td><td>la division à l'intérieur d'une région&nbsp;; il y en a 101</td><td><em>un departamento (una provincia)</em></td></tr>
            <tr><td><strong>une commune</strong></td><td>une ville ou un village, avec son maire</td><td><em>un municipio</em></td></tr>
            <tr><td><strong>un chef-lieu</strong></td><td>la ville principale d'une région ou d'un département</td><td><em>una capital administrativa</em></td></tr>
            <tr><td><strong>la métropole</strong></td><td>la France d'Europe, sans l'outre-mer</td><td><em>la Francia peninsular</em></td></tr>
            <tr><td><strong>l'outre-mer</strong> <em>(m.)</em></td><td>les territoires français hors d'Europe</td><td><em>los territorios de ultramar</em></td></tr>
            <tr><td><strong>l'Hexagone</strong> <em>(m.)</em></td><td>surnom de la France métropolitaine, à cause de sa forme à six côtés</td><td><em>apodo de Francia</em></td></tr>
            <tr><td><strong>une frontière</strong></td><td>la limite entre deux pays</td><td><em>una frontera</em></td></tr>
            <tr><td><strong>une côte</strong></td><td>le bord de la mer</td><td><em>una costa</em></td></tr>
            <tr><td><strong>un fleuve</strong></td><td>un grand cours d'eau qui finit dans la mer</td><td><em>un río (que desemboca en el mar)</em></td></tr>
            <tr><td><strong>un habitant</strong></td><td>une personne qui vit dans un lieu&nbsp;: un Breton, une Bretonne</td><td><em>un habitante</em></td></tr>
          </tbody>
        </table>

        <div class="note">
          <strong>Faux ami&nbsp;:</strong> <em>la métropole</em> ne veut pas dire
          «&nbsp;grande ville&nbsp;» comme <em>metrópoli</em>. Pour une grande ville, le
          français dit <em>une grande ville</em> ou <em>une agglomération</em>.
        </div>
      </article>

      <!-- ── Crédits photo ───────────────────────── -->
      <article>
        <h2>Crédits photographiques</h2>
        <p class="photo-text">
          Photographies issues de Wikimedia Commons, recadrées et redimensionnées pour cette
          page. Merci à leurs auteurs.
        </p>
        <ul class="credits">
          <li v-for="region in regions" :key="region.slug">
            {{ region.name }} — {{ region.credit.author }},
            <a :href="region.credit.page" target="_blank" rel="noopener">{{ region.credit.title }}</a>,
            {{ region.credit.licence }}.
          </li>
        </ul>
      </article>

      <RelatedLinks />

    </main>
  </AltLayout>
</template>

<script setup>
import AltLayout from '@/layouts/AltLayout.vue'
import RelatedLinks from '@/components/RelatedLinks.vue'

/* The photographs live in `public/img/culture/regions/`, one 560×373 WebP per
   region, so the page weighs about 600 KB and works with the plane in flight
   mode. `credit` is not decoration: every image here is CC-BY or CC-BY-SA, and
   those licences are only respected with the author, the licence and a link. */
const regions = [
  {
    slug: 'hauts-de-france',
    name: 'Hauts-de-France',
    chief: 'Lille',
    text: "La Grand-Place de Lille, tout près de la frontière belge, est le cœur de la ville.",
    alt: "La Grand-Place de Lille et ses façades flamandes, un jour de marché.",
    credit: { author: 'Chabe01', title: 'Grand Place Lille 2.jpg', licence: 'CC BY-SA 4.0',
      page: 'https://commons.wikimedia.org/wiki/File:Grand_Place_Lille_2.jpg' },
  },
  {
    slug: 'normandie',
    name: 'Normandie',
    chief: 'Rouen',
    text: "Le Mont-Saint-Michel se dresse au milieu de sa baie ; à marée haute, la mer entoure le rocher.",
    alt: "Le Mont-Saint-Michel éclairé à la tombée de la nuit.",
    credit: { author: 'Benh Lieu Song', title: 'MSM sunset 02.JPG', licence: 'CC BY 2.5',
      page: 'https://commons.wikimedia.org/wiki/File:MSM_sunset_02.JPG' },
  },
  {
    slug: 'bretagne',
    name: 'Bretagne',
    chief: 'Rennes',
    text: "Au nord, la côte de granit rose doit son nom à la couleur des rochers.",
    alt: "Rochers de granit rose et vagues sur la côte de Ploumanac'h.",
    credit: { author: 'W. Bulach', title: 'Rocks of Côte de granit rose, Ploumanac’h', licence: 'CC BY-SA 4.0',
      page: 'https://commons.wikimedia.org/wiki/File:00_0676_Rocks_of_C%C3%B4te_de_granit_rose_-_Ploumanac%C2%B4h,_France.jpg' },
  },
  {
    slug: 'ile-de-france',
    name: 'Île-de-France',
    chief: 'Paris',
    text: "La région la plus peuplée : près d'un Français sur cinq y habite. La tour Eiffel date de 1889.",
    alt: "La tour Eiffel au printemps, derrière des arbres en fleurs.",
    credit: { author: 'Jorge Royan', title: 'The Eiffel Tower in spring', licence: 'CC BY-SA 3.0',
      page: 'https://commons.wikimedia.org/wiki/File:Paris_-_The_Eiffel_Tower_in_spring_-_2307.jpg' },
  },
  {
    slug: 'grand-est',
    name: 'Grand Est',
    chief: 'Strasbourg',
    text: "À Strasbourg, le quartier de la Petite France aligne ses maisons à colombages au bord de l'eau.",
    alt: "Maisons à colombages le long d'un canal, quartier de la Petite France à Strasbourg.",
    credit: { author: 'Dietmar Rabich', title: 'Straßburg, Petite France', licence: 'CC BY-SA 4.0',
      page: 'https://commons.wikimedia.org/wiki/File:Stra%C3%9Fburg_(Frankreich),_Petite_France_--_2011_--_1759.jpg' },
  },
  {
    slug: 'pays-de-la-loire',
    name: 'Pays de la Loire',
    chief: 'Nantes',
    text: "Les dix-sept tours du château d'Angers gardent l'entrée de la vallée de la Loire.",
    alt: "Les tours rondes et les remparts du château d'Angers.",
    credit: { author: 'Nataloche', title: "Château d'Angers-2015b.JPG", licence: 'CC BY-SA 4.0',
      page: 'https://commons.wikimedia.org/wiki/File:Ch%C3%A2teau_d%27Angers-2015b.JPG' },
  },
  {
    slug: 'centre-val-de-loire',
    name: 'Centre-Val de Loire',
    chief: 'Orléans',
    text: "Chambord, le plus grand des châteaux de la Loire, a été commencé en 1519 sous François Ier.",
    alt: "Vue aérienne du château de Chambord et de ses jardins.",
    credit: { author: 'Carsten Steger', title: 'Aerial image of Château de Chambord', licence: 'CC BY-SA 4.0',
      page: 'https://commons.wikimedia.org/wiki/File:Aerial_image_of_Ch%C3%A2teau_de_Chambord_(view_from_the_northwest).jpg' },
  },
  {
    slug: 'bourgogne-franche-comte',
    name: 'Bourgogne-Franche-Comté',
    chief: 'Dijon',
    text: "Les toits de tuiles vernissées des Hospices de Beaune datent du XVᵉ siècle.",
    alt: "Toits de tuiles vernissées colorées des Hospices de Beaune.",
    credit: { author: 'Jebulon', title: 'Hospices beaune toits1.jpg', licence: 'domaine public',
      page: 'https://commons.wikimedia.org/wiki/File:Hospices_beaune_toits1.jpg' },
  },
  {
    slug: 'nouvelle-aquitaine',
    name: 'Nouvelle-Aquitaine',
    chief: 'Bordeaux',
    text: "La plus vaste des régions. La dune du Pilat, plus de cent mètres de haut, est la plus haute d'Europe.",
    alt: "La crête de sable de la dune du Pilat, l'océan au fond.",
    credit: { author: 'Jörg Braukmann', title: 'Sommet de la Dune du Pilat.jpg', licence: 'CC BY-SA 4.0',
      page: 'https://commons.wikimedia.org/wiki/File:Sommet_de_la_Dune_du_Pilat.jpg' },
  },
  {
    slug: 'auvergne-rhone-alpes',
    name: 'Auvergne-Rhône-Alpes',
    chief: 'Lyon',
    text: "Le mont Blanc, environ 4 800 mètres, est le plus haut sommet des Alpes.",
    alt: "Les sommets enneigés du massif du Mont-Blanc, vus de l'Aiguille du Midi.",
    credit: { author: 'Jacek Rużyczka', title: "Mont Blanc depuis l'Aiguille du Midi", licence: 'CC BY-SA 4.0',
      page: 'https://commons.wikimedia.org/wiki/File:Mont_Blanc_depuis_l%27Aiguille_du_Midi.jpg' },
  },
  {
    slug: 'occitanie',
    name: 'Occitanie',
    chief: 'Toulouse',
    text: "Entourée de deux rangées de remparts, la cité de Carcassonne se visite comme une ville du Moyen Âge.",
    alt: "Les remparts et les tours de la cité médiévale de Carcassonne.",
    credit: { author: 'Krzysztof Golik', title: 'Ramparts of the fortified city of Carcassonne', licence: 'CC BY-SA 4.0',
      page: 'https://commons.wikimedia.org/wiki/File:Ramparts_of_the_historic_fortified_city_of_Carcassone_10.jpg' },
  },
  {
    slug: 'provence-alpes-cote-azur',
    name: "Provence-Alpes-Côte d'Azur",
    chief: 'Marseille',
    text: "Sur le plateau de Valensole, la lavande fleurit en juin et en juillet.",
    alt: "Rangées de lavande en fleur sur le plateau de Valensole.",
    credit: { author: 'ADT 04', title: 'Champs de lavande à Valensole.jpg', licence: 'CC BY 2.0',
      page: 'https://commons.wikimedia.org/wiki/File:Champs_de_lavande_%C3%A0_Valensole.jpg' },
  },
  {
    slug: 'corse',
    name: 'Corse',
    chief: 'Ajaccio',
    text: "Bonifacio est bâtie tout en haut de falaises blanches, à la pointe sud de l'île.",
    alt: "Maisons de Bonifacio au bord de falaises calcaires blanches.",
    credit: { author: 'Isiwal', title: 'Corsica Bonifacio Ville haute Falaises.jpg', licence: 'CC BY-SA 3.0',
      page: 'https://commons.wikimedia.org/wiki/File:Corsica_Bonifacio_Ville_haute_Falaises.jpg' },
  },
]
</script>
