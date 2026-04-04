<?php

declare(strict_types=1);

namespace Database\Factories;

use App\Enums\TicketPriority;
use App\Enums\TicketStatus;
use App\Models\Ticket;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class TicketFactory extends Factory
{
    protected $model = Ticket::class;

    private static array $titles = [
        'המערכת לא מגיבה ללחיצה על כפתור שליחה',
        'שגיאה בטעינת דף הבית',
        'בעיה בהתחברות עם סיסמה נכונה',
        'הדוחות לא מציגים נתונים עדכניים',
        'העמוד קורס בדפדפן ספארי',
        'תצוגה לא תקינה במסכים קטנים',
        'הודעות מייל לא נשלחות ללקוחות',
        'תקלה בהעלאת קבצים מעל 5MB',
        'שגיאת 500 בעת שמירת טופס יצירת קשר',
        'באג בחישוב סכומים בעגלת קניות',
        'שגיאה בעת מחיקת פריטים מהרשימה',
        'תקלה בעיבוד תשלומים בכרטיס אשראי',
    ];

    private static array $descriptions = [
        'המשתמשים מדווחים על בעיה חוזרת שמשפיעה על חוויית השימוש. צריך לבדוק ולתקן בהקדם.',
        'הבעיה התגלתה היום בבוקר ומשפיעה על מספר משתמשים. נדרש טיפול מיידי.',
        'לאחר בדיקה ראשונית נראה שהתקלה קשורה לשינוי האחרון שנעשה בקוד.',
        'הלקוח פנה מספר פעמים בנושא ומצפה למענה מהיר.',
        'הבעיה מתרחשת רק בסביבת הייצור ולא ניתנת לשחזור בסביבת הפיתוח.',
    ];

    public function definition(): array
    {
        return [
            'title' => fake()->randomElement(static::$titles),
            'description' => fake()->randomElement(static::$descriptions),
            'status' => fake()->randomElement(TicketStatus::cases()),
            'priority' => fake()->randomElement(TicketPriority::cases()),
            'assigned_user_id' => fake()->boolean(70) ? User::factory() : null,
            'created_at' => fake()->dateTimeBetween('-30 days', 'now'),
        ];
    }


    public function highPriority(): static
    {
        return $this->state(fn () => [
            'priority' => TicketPriority::High,
            'status' => TicketStatus::InProgress,
            'created_at' => now()->subHours(72),
            'updated_at' => now()->subHours(72),
        ]);
    }
}
