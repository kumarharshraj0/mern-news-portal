import { Edit, Trash2 } from "lucide-react";

export default function NewsTable({ news }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-slate-50/50 border-b border-border">
            <th className="px-8 py-5 text-[10px] font-semibold uppercase tracking-widest text-ink-faint text-left">Story Title</th>
            <th className="px-8 py-5 text-[10px] font-semibold uppercase tracking-widest text-ink-faint text-left">Category</th>
            <th className="px-8 py-5 text-[10px] font-semibold uppercase tracking-widest text-ink-faint text-left">Published</th>
            <th className="px-8 py-5 text-[10px] font-semibold uppercase tracking-widest text-ink-faint text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {news.map((item) => (
            <tr
              key={item.id}
              className="hover:bg-slate-50/50 transition-colors group"
            >
              <td className="px-8 py-6">
                <p className="text-sm font-bold text-ink group-hover:text-brand transition-colors line-clamp-1">{item.title}</p>
              </td>
              <td className="px-8 py-6">
                <span className="text-[10px] font-semibold uppercase tracking-widest text-ink-faint bg-slate-100 px-3 py-1 rounded-full">{item.category}</span>
              </td>
              <td className="px-8 py-6">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{item.date}</p>
              </td>
              <td className="px-8 py-6 text-right">
                <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="flex items-center gap-2 px-4 py-2 bg-white border border-border rounded-xl text-[10px] font-semibold uppercase tracking-widest text-ink hover:border-brand hover:text-brand transition-all">
                    <Edit className="w-3 h-3" /> Edit
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 bg-white border border-border rounded-xl text-[10px] font-semibold uppercase tracking-widest text-red-500 hover:bg-red-50 hover:border-red-100 transition-all">
                    <Trash2 className="w-3 h-3" /> Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
