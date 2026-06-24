import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { SmoothScroll } from "@/lib/smooth-scroll";
import { Cursor } from "@/components/cursor";

export default function PrivacyPolicy() {
  const navigate = useNavigate();

  const sections = [
    {
      title: "1. Introduction",
      text: 'Lumen Capital ("nous", "notre" ou "nos") respecte votre vie privée et s\'engage à protéger vos données personnelles. Cette politique de confidentialité décrit comment nous collectons, utilisons, stockons et partageons vos informations personnelles lorsque vous visitez ou interagissez avec notre plateforme.',
    },
    {
      title: "2. Définitions",
      text: 'Dans cette politique, "Informations Personnelles" désigne toute donnée relative à une personne physique identifiée ou identifiable. "Service" désigne les plateformes éducatives de crypto-monnaie et les applications web de Lumen. "CRM" désigne notre système tiers de gestion des prospects et des affiliés.',
    },
    {
      title: "3. Informations que nous collectons",
      text: "Nous collectons des informations pour offrir une meilleure expérience sur notre site web. Cela inclut les données que vous nous fournissez directement (par exemple, via les formulaires d'inscription et de contact) et les paramètres techniques collectés automatiquement lors de votre session de navigation.",
    },
    {
      title: "4. Informations que vous fournissez volontairement",
      text: "Nous collectons les identifiants personnels que vous saisissez volontairement dans nos formulaires de contact et d'inscription sur la page d'accueil ou en session connectée, ce qui inclut votre nom complet, votre adresse e-mail, votre numéro de téléphone et tout message supplémentaire que vous choisissez d'écrire.",
    },
    {
      title: "5. Informations collectées automatiquement",
      text: "Lorsque vous naviguez sur la plateforme, nous collectons automatiquement des métadonnées de journal de base, notamment les adresses IP, les types de navigateurs, les préférences linguistiques, les URL de référence, les dates et heures d'accès et les statistiques de clic sur les pages.",
    },
    {
      title: "6. Finalité de la collecte de données",
      text: "Vos données sont collectées pour vérifier l'authenticité des utilisateurs, enregistrer les sessions utilisateur actives, fournir des identifiants de connexion sécurisés, personnaliser les interfaces éducatives, répondre aux demandes stratégiques et gérer les journaux de suivi des affiliés.",
    },
    {
      title: "7. Base légale du traitement",
      text: "Nous traitons vos informations personnelles sur les bases légales suivantes : (a) Votre consentement explicite ; (b) L'exécution de notre obligation contractuelle de donner accès à la plateforme éducative ; et (c) Notre intérêt commercial légitime à gérer les relations et à sécuriser le site.",
    },
    {
      title: "8. Utilisation des informations personnelles",
      text: "Nous utilisons vos données pour : créer votre compte éducatif, vérifier les sessions utilisateur via des fichiers de base de données sécurisés, acheminer les demandes des clients vers le bureau approprié, suivre les prospects affiliés et respecter les directives standard de lutte contre la fraude.",
    },
    {
      title: "9. CRM & Prestataires de services tiers",
      text: "Les formulaires de contact et d'inscription sécurisés de Lumen soumettent automatiquement des données à notre service CRM Core (inwo.crmcore.me) pour traiter et suivre les prospects investisseurs. Cette intégration est gérée via des points de terminaison proxy backend sécurisés pour protéger vos identifiants.",
    },
    {
      title: "10. Cookies",
      text: "Nous utilisons des cookies essentiels pour maintenir votre session de connexion. Vous pouvez configurer votre navigateur pour refuser les cookies, mais cela peut limiter votre capacité à accéder aux sections éducatives privées ou à conserver vos paramètres personnalisés.",
    },
    {
      title: "11. Technologies de suivi",
      text: "Nous ne déployons pas de pixels d'analyse tiers invasifs. Les états de session de base sont stockés localement sur votre appareil (par exemple, localStorage) et côté serveur à l'aide de blobs privés Vercel pour suivre les jetons de session en toute sécurité.",
    },
    {
      title: "12. Sécurité des données",
      text: "Nous utilisons des mesures techniques et organisationnelles strictes pour sécuriser vos données, notamment le cryptage HTTPS, des proxys backend serverless qui masquent les secrets des affiliés et des contraintes d'accès privé sur nos conteneurs de stockage de blobs.",
    },
    {
      title: "13. Conservation des données",
      text: "Nous ne conservons vos données personnelles et vos sessions que le temps nécessaire pour fournir l'accès à la plateforme, maintenir les fichiers de relation CRM ou nous conformer aux obligations d'audit légal. Les fichiers de session expirés sont périodiquement purgés.",
    },
    {
      title: "14. Transferts internationaux de données",
      text: "Vos informations peuvent être stockées et traitées dans des pays autres que celui de votre résidence, y compris sur des serveurs cloud maintenus par Vercel dans l'Union européenne ou aux États-Unis. Nous veillons à ce que des clauses standard de protection des données régissent ces transferts.",
    },
    {
      title: "15. Droits de l'utilisateur",
      text: "Selon votre juridiction (par exemple, RGPD, CCPA), vous disposez de droits d'accès, de rectification, de suppression, de restriction ou d'obtention d'une copie de vos données personnelles. Pour exercer ces droits, soumettez une demande via notre portail de contact.",
    },
    {
      title: "16. Communications marketing",
      text: "Si vous vous inscrivez ou vous abonnez, nous pouvons vous envoyer occasionnellement des newsletters ou des mises à jour éducatives. Vous pouvez vous désabonner à tout moment en cliquant sur le lien situé au bas des e-mails.",
    },
    {
      title: "17. Protection de la vie privée des enfants",
      text: "Nos services sont conçus exclusivement pour des utilisateurs institutionnels et adultes. Nous ne collectons pas sciemment de données personnelles auprès de personnes de moins de 18 ans.",
    },
    {
      title: "18. Sites web tiers",
      text: "Notre plateforme peut contenir des liens vers des outils, réseaux ou références externes de crypto-monnaie. Nous ne contrôlons pas et ne sommes pas responsables des pratiques de confidentialité des adresses web externes.",
    },
    {
      title: "19. Mises à jour de la politique",
      text: "Nous mettons à jour cette politique de confidentialité de temps à autre pour refléter les changements de la plateforme. Les mises à jour sont publiées directement sur cette URL, et votre utilisation continue indique votre acceptation des conditions mises à jour.",
    },
    {
      title: "20. Coordonnées de contact",
      text: "Si vous avez des questions, des préoccupations ou des demandes concernant cette politique de confidentialité, veuillez contacter notre responsable de la protection de la vie privée à hello@lumen.capital.",
    },
    {
      title: "21. Date de dernière mise à jour",
      text: "Cette politique de confidentialité a été mise à jour pour la dernière fois le 24 juin 2026.",
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SmoothScroll />
      <Cursor />
      <Nav />

      <main className="relative bg-hero pt-32 pb-24 px-6">
        <div className="absolute inset-0 grid-bg" />

        <div className="relative mx-auto max-w-3xl">
          {/* Back button */}
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer mb-8"
          >
            <ArrowLeft className="h-4 w-4" /> Retour à l'accueil
          </button>

          {/* Heading */}
          <div className="mb-12">
            <div className="inline-flex rounded-full glass px-3 py-1 text-xs text-muted-foreground">
              Portail Légal
            </div>
            <h1 className="mt-3 font-display text-4xl md:text-6xl tracking-tight">
              Politique de Confidentialité
            </h1>
            <p className="mt-2 text-muted-foreground text-sm">
              Veuillez lire attentivement cette politique de confidentialité pour comprendre comment nous protégeons vos actifs personnels et vos données.
            </p>
          </div>

          {/* Content Card */}
          <div className="glass-strong rounded-3xl p-8 shadow-card space-y-8 border border-white/10">
            {sections.map((sec, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.02 }}
                className="space-y-2 border-b border-white/5 pb-6 last:border-0 last:pb-0"
              >
                <h3 className="font-display text-xl md:text-2xl text-primary">{sec.title}</h3>
                <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                  {sec.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
