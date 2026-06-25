import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { SmoothScroll } from "@/lib/smooth-scroll";
import { Cursor } from "@/components/cursor";

export default function TermsConditions() {
  const navigate = useNavigate();

  const sections = [
    {
      title: "1. Acceptation des conditions",
      text: 'En accédant à la plateforme Elite Chain ("Site web" ou "Service"), en y naviguant ou en l\'utilisant, vous reconnaissez avoir lu, compris et accepté d\'être lié par ces Conditions Générales. Si vous n\'êtes pas d\'accord, vous devez immédiatement cesser d\'accéder à la plateforme.',
    },
    {
      title: "2. Éligibilité",
      text: "En accédant à ce Site web, vous déclarez et garantissez que vous êtes âgé d'au moins 18 ans, que vous possédez la capacité juridique de conclure des accords contraignants et que vous n'êtes pas interdit d'accéder à des plateformes d'actifs numériques en vertu de vos lois locales.",
    },
    {
      title: "3. Objectif du site web",
      text: "Le Service fournit des portails éducatifs sur la crypto-monnaie, des interfaces de carnet d'ordres fictives, des outils d'analyse des risques, des simulateurs de blockchain et des perspectives de marché techniques. Il est conçu pour agir strictement comme une ressource d'apprentissage.",
    },
    {
      title: "4. Responsabilités de l'utilisateur",
      text: "Vous êtes responsable de la sécurisation des appareils utilisés pour accéder au Site web et de la protection de votre clé de session de connexion sécurisée. Vous acceptez de fournir des informations exactes, actuelles et complètes lors de votre inscription ou de l'envoi de demandes stratégiques.",
    },
    {
      title: "5. Utilisation acceptable",
      text: "Vous acceptez d'utiliser ce Site web uniquement à des fins licites. Vous ne devez pas tenter de perturber les performances opérationnelles de nos fonctions serverless backend, de contourner les barrières d'authentification ou d'accéder aux blobs de base de données d'autres utilisateurs.",
    },
    {
      title: "6. Activités interdites",
      text: "Les actions interdites comprennent : l'ingénierie inverse des actifs de la plateforme, l'exécution de scripts de collecte automatique de données (scraping), le téléchargement de codes malveillants, le spamming des formulaires de contact, l'utilisation de jetons de session qui ne vous appartiennent pas et la fourniture de fausses informations.",
    },
    {
      title: "7. Propriété intellectuelle",
      text: "Tout le matériel de ce Site web, y compris les textes, les systèmes de conception personnalisés, les icônes, les graphiques, les graphiques interactifs, les logos et les scripts de serveur, sont la propriété intellectuelle exclusive de Elite Chain et sont protégés par les lois internationales sur le droit d'auteur.",
    },
    {
      title: "8. Exactitude des informations",
      text: 'Bien que nous nous efforcions de maintenir le contenu éducatif à jour, nous ne garantissons pas que les indicateurs, les graphiques en chandeliers simulés ou les carnets d\'ordres fictifs représentent les prix réels ou actifs du marché. Le contenu est fourni "en l\'état".',
    },
    {
      title: "9. Aucun conseil financier",
      text: "Les calculs, évaluations de simulateurs, graphiques et articles affichés à l'intérieur de la plateforme sont uniquement à des fins éducatives. Ils ne constituent pas des conseils financiers et ne doivent pas être traités comme un appel à acheter, conserver ou vendre des actifs numériques.",
    },
    {
      title: "10. Aucun conseil en investissement",
      text: "Elite Chain ne fonctionne pas comme un conseiller en investissement, un courtier ou un consultant financier. Nous ne construisons pas de portefeuilles personnalisés et ne gérons pas de fonds. Consultez toujours un professionnel agréé avant de prendre des décisions d'investissement.",
    },
    {
      title: "11. Divulgation des risques liés aux crypto-monnaies",
      text: "Les marchés de crypto-monnaies sont soumis à une volatilité extrême, à des changements réglementaires, à des bifurcations de réseau (forks), à des défaillances de plateformes d'échange et à la perte permanente d'actifs. Les activités de jalonnement (staking), de trading et d'auto-conservation impliquent un risque structurel élevé.",
    },
    {
      title: "12. Aucune garantie de rendement",
      text: "Nous ne faisons aucune déclaration ni ne garantissons que le fait de suivre les modèles ou les stratégies de risque mentionnés dans le pôle éducatif générera des bénéfices ou vous protégera des baisses d'actifs. Les résultats simulés passés ne sont pas indicatifs des performances futures.",
    },
    {
      title: "13. Limitation de responsabilité",
      text: "Dans la mesure maximale permise par la loi, Elite Chain, ses affiliés, dirigeants et développeurs ne seront pas responsables des dommages directs, indirects, accessoires, spéciaux ou consécutifs résultant de votre utilisation ou de votre incapacité à utiliser la plateforme.",
    },
    {
      title: "14. Indemnisation",
      text: "Vous acceptez d'indemniser, de défendre et de dégager de toute responsabilité Elite Chain, ses administrateurs, employés et développeurs contre toute réclamation, perte ou responsabilité juridique découlant de votre violation de ces Conditions ou d'une mauvaise utilisation du Site web.",
    },
    {
      title: "15. Liens tiers",
      text: "Notre Site web peut renvoyer vers des outils ou des plateformes externes. Nous n'approuvons pas et n'assumons aucune responsabilité pour les contenus, produits ou services disponibles sur ces adresses web tierces.",
    },
    {
      title: "16. Référence à la politique de confidentialité",
      text: "Votre accès et votre utilisation de ce Site web sont également régis par notre Politique de Confidentialité, qui détaille comment nous collectons, stockons et traitons vos identifiants personnels et fichiers de session en toute sécurité.",
    },
    {
      title: "17. Suspension d'accès",
      text: "Nous nous réservons le droit, sans préavis et à notre seule discrétion, de suspendre ou de résilier votre accès au portail client éducatif en cas de violation de ces Conditions ou d'activités menaçant l'intégrité de la base de données.",
    },
    {
      title: "18. Loi applicable",
      text: "Ces Conditions Générales sont régies et interprétées conformément aux lois de Chypre, sans égard aux principes de conflit de lois.",
    },
    {
      title: "19. Résolution des litiges",
      text: "Tout différend, controverse ou réclamation découlant de ces Conditions sera réglé par des négociations de bonne foi, à défaut de quoi le différend sera soumis à un arbitrage exécutoire à Chypre.",
    },
    {
      title: "20. Divisibilité",
      text: "Si une disposition de ces Conditions est jugée invalide ou inapplicable par un tribunal compétent, cette disposition sera limitée et les dispositions restantes continueront d'être pleinement applicables.",
    },
    {
      title: "21. Modifications des conditions",
      text: "Nous nous réservons le droit de modifier ces Conditions Générales à tout moment. Les modifications entrent en vigueur immédiatement après leur publication sur cette URL. Votre utilisation continue du site représente votre acceptation des conditions révisées.",
    },
    {
      title: "22. Coordonnées de contact",
      text: "Pour toute demande concernant ces Conditions, veuillez contacter notre service juridique à hello@elitechain.capital.",
    },
    {
      title: "23. Date de dernière mise à jour",
      text: "Ces Conditions Générales ont été mises à jour pour la dernière fois le 24 juin 2026.",
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
              Conditions Générales
            </h1>
            <p className="mt-2 text-muted-foreground text-sm">
              Veuillez lire attentivement ces Conditions Générales avant d'utiliser les services de Elite Chain.
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
